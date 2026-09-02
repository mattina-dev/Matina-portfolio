/**
 * A deterministic-ish market data simulator.
 *
 * It stands in for the exchange WebSocket feeds I worked with on Cyclical Waves:
 * many small messages per second, arriving faster than any UI can usefully
 * repaint. The demo page consumes it the same way I consume a real socket —
 * buffer the ticks, flush once per animation frame — so the rendering strategy
 * on show here is the real one, only the transport is faked.
 */

export interface SymbolSpec {
  id: string
  name: string
  /** Starting price in USD. */
  price: number
  /** Annualised-ish volatility knob; higher means jumpier. */
  volatility: number
}

export interface Tick {
  id: string
  price: number
  size: number
  side: 'buy' | 'sell'
  ts: number
}

export interface SymbolState {
  id: string
  name: string
  price: number
  open: number
  high: number
  low: number
  /** Rolling price history, oldest first. */
  history: Float64Array
  /** Number of valid samples in `history`. */
  filled: number
  /** Write cursor into the ring buffer. */
  cursor: number
}

export const SYMBOLS: SymbolSpec[] = [
  { id: 'BTC/USD', name: 'Bitcoin', price: 64250, volatility: 0.0009 },
  { id: 'ETH/USD', name: 'Ethereum', price: 3180, volatility: 0.0012 },
  { id: 'SOL/USD', name: 'Solana', price: 148.6, volatility: 0.0021 },
  { id: 'ADA/USD', name: 'Cardano', price: 0.612, volatility: 0.0018 },
  { id: 'LINK/USD', name: 'Chainlink', price: 17.85, volatility: 0.0016 },
  { id: 'AVAX/USD', name: 'Avalanche', price: 34.4, volatility: 0.0024 },
]

export const HISTORY_SIZE = 480

/** mulberry32 — small seeded PRNG, used to make the first render deterministic. */
function seeded(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Box–Muller transform: uniform noise in, normally distributed noise out. */
function gaussian(rand: () => number = Math.random): number {
  let u = 0
  let v = 0
  while (u === 0) u = rand()
  while (v === 0) v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/**
 * Seeds a symbol with a full window of back-history so the chart reads as a
 * real series on first paint instead of a flat line that fills in over ten
 * seconds. The walk runs backwards from the spec price, so the series ends
 * exactly where live ticks pick up, and it is seeded so the session extremes
 * rendered on the server match the client's.
 */
export function createSymbolState(spec: SymbolSpec, seed = 1): SymbolState {
  const rand = seeded(seed)
  const history = new Float64Array(HISTORY_SIZE)

  let price = spec.price
  history[HISTORY_SIZE - 1] = price
  for (let i = HISTORY_SIZE - 2; i >= 0; i -= 1) {
    price = Math.max(price * (1 - gaussian(rand) * spec.volatility), spec.price * 0.2)
    history[i] = price
  }

  let high = -Infinity
  let low = Infinity
  for (let i = 0; i < HISTORY_SIZE; i += 1) {
    const v = history[i]!
    if (v > high) high = v
    if (v < low) low = v
  }

  return {
    id: spec.id,
    name: spec.name,
    price: spec.price,
    open: history[0]!,
    high,
    low,
    history,
    filled: HISTORY_SIZE,
    cursor: 0,
  }
}

/** Append a price to a symbol's ring buffer and refresh its session extremes. */
export function pushPrice(state: SymbolState, price: number): void {
  state.history[state.cursor] = price
  state.cursor = (state.cursor + 1) % HISTORY_SIZE
  if (state.filled < HISTORY_SIZE) state.filled += 1
  state.price = price
  if (price > state.high) state.high = price
  if (price < state.low) state.low = price
}

/**
 * Read the ring buffer back in chronological order.
 * Reuses `out` so the render loop allocates nothing per frame.
 */
export function readHistory(state: SymbolState, out: Float64Array): Float64Array {
  const { history, cursor } = state
  const head = HISTORY_SIZE - cursor
  out.set(history.subarray(cursor), 0)
  out.set(history.subarray(0, cursor), head)
  return out
}

export interface FeedOptions {
  /** Target ticks per second across all symbols. */
  ticksPerSecond?: number
  onTick: (tick: Tick) => void
}

/**
 * Emits ticks on a timer, in bursts, the way a busy socket actually delivers
 * them — several messages between two paints rather than one neat message
 * per frame.
 */
export class MarketFeed {
  private specs = new Map<string, SymbolSpec>()
  private last = new Map<string, number>()
  private timer: ReturnType<typeof setInterval> | null = null
  private readonly intervalMs = 40
  private ticksPerSecond: number
  private onTick: (tick: Tick) => void

  /** Ticks emitted since the last `drainCount()`, for the live rate readout. */
  private emitted = 0

  constructor(specs: SymbolSpec[], options: FeedOptions) {
    for (const spec of specs) {
      this.specs.set(spec.id, spec)
      this.last.set(spec.id, spec.price)
    }
    this.ticksPerSecond = options.ticksPerSecond ?? 240
    this.onTick = options.onTick
  }

  start(): void {
    if (this.timer !== null) return
    const perBurst = Math.max(1, Math.round((this.ticksPerSecond * this.intervalMs) / 1000))
    const ids = [...this.specs.keys()]

    this.timer = setInterval(() => {
      const now = Date.now()
      for (let i = 0; i < perBurst; i += 1) {
        const id = ids[(Math.random() * ids.length) | 0]!
        const spec = this.specs.get(id)!
        const previous = this.last.get(id)!

        // Geometric random walk with a mild pull back toward the start price,
        // so a long-running demo drifts but never runs away. The reversion term
        // is a log ratio so it stays dimensionless, like the volatility term.
        const reversion = Math.log(spec.price / previous) * 0.0009
        const step = gaussian() * spec.volatility + reversion
        const next = Math.max(previous * (1 + step), spec.price * 0.2)
        this.last.set(id, next)
        this.emitted += 1

        this.onTick({
          id,
          price: next,
          size: Number((Math.random() * 2.4 + 0.01).toFixed(3)),
          side: next >= previous ? 'buy' : 'sell',
          ts: now,
        })
      }
    }, this.intervalMs)
  }

  stop(): void {
    if (this.timer === null) return
    clearInterval(this.timer)
    this.timer = null
  }

  get running(): boolean {
    return this.timer !== null
  }

  /** Returns ticks emitted since the previous call and resets the counter. */
  drainCount(): number {
    const count = this.emitted
    this.emitted = 0
    return count
  }
}

export interface BookLevel {
  price: number
  size: number
  total: number
}

export interface OrderBook {
  bids: BookLevel[]
  asks: BookLevel[]
  maxTotal: number
}

/**
 * Builds a plausible order book around a mid price.
 * Pass a `seed` to get a stable book — the initial render does this so the
 * server-rendered markup and the client's first paint agree.
 */
export function buildOrderBook(mid: number, levels = 8, seed?: number): OrderBook {
  const rand = seed === undefined ? Math.random : seeded(seed)
  const bids: BookLevel[] = []
  const asks: BookLevel[] = []
  const step = mid * 0.00035
  let bidTotal = 0
  let askTotal = 0

  for (let i = 0; i < levels; i += 1) {
    const bidSize = rand() * 3 + 0.2
    const askSize = rand() * 3 + 0.2
    bidTotal += bidSize
    askTotal += askSize
    bids.push({ price: mid - step * (i + 1), size: bidSize, total: bidTotal })
    asks.push({ price: mid + step * (i + 1), size: askSize, total: askTotal })
  }
  return { bids, asks, maxTotal: Math.max(bidTotal, askTotal) }
}

/** Compact price formatting that stays readable across a 0.6 → 64,000 range. */
export function formatPrice(value: number): string {
  if (value >= 1000) return value.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  if (value >= 1) return value.toFixed(2)
  return value.toFixed(4)
}
