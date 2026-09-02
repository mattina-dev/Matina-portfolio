<template>
    <div class="demo">
        <div class="shell">
            <header class="demo-head">
                <div>
                    <NuxtLink to="/" class="back"><i class="mdi mdi-arrow-left" aria-hidden="true" /> Back to portfolio</NuxtLink>
                    <h1>Real-Time Trading Dashboard</h1>
                    <p class="lede">
                        A live demo of the rendering approach I use for streaming market data: a feed pushing
                        <strong>~{{ TARGET_TPS }} ticks per second</strong> into a UI that stays at 60fps.
                        No account, no login — it is running right now.
                    </p>
                </div>
                <span class="sim-badge">
                    <i class="mdi mdi-flask-outline" aria-hidden="true" />
                    Simulated market data — built for this portfolio
                </span>
            </header>

            <!-- Performance instrumentation: the actual point of the demo -->
            <section class="perf">
                <div class="stat">
                    <span class="stat-label">Frame rate</span>
                    <span class="stat-value" :class="fpsClass">{{ fps }} <small>fps</small></span>
                </div>
                <div class="stat">
                    <span class="stat-label">Incoming ticks</span>
                    <span class="stat-value">{{ tickRate }} <small>/sec</small></span>
                </div>
                <div class="stat">
                    <span class="stat-label">Worst frame</span>
                    <span class="stat-value" :class="frameClass">{{ worstFrame.toFixed(1) }} <small>ms</small></span>
                </div>
                <div class="stat">
                    <span class="stat-label">DOM updates</span>
                    <span class="stat-value" :class="domRate > 60 ? 'down' : 'up'">
                        {{ domRate }} <small>/sec</small>
                    </span>
                </div>

                <div class="perf-controls">
                    <label class="switch" :class="{ danger: !coalesced }">
                        <input type="checkbox" v-model="coalesced" />
                        <span>{{ coalesced ? 'Coalesced rendering' : 'Naive: render every tick' }}</span>
                    </label>
                    <button class="ghost-btn" @click="toggleFeed">
                        <i :class="running ? 'mdi mdi-pause' : 'mdi mdi-play'" aria-hidden="true" />
                        {{ running ? 'Pause feed' : 'Resume feed' }}
                    </button>
                </div>
            </section>

            <p class="perf-hint">
                <i class="mdi mdi-lightbulb-on-outline" aria-hidden="true" />
                Flip the switch to <strong>naive</strong> and watch <strong>DOM updates</strong> jump from a steady
                ~8/sec to match the full tick rate — roughly <strong>{{ coalesceRatio }}× the render work for an
                    identical-looking screen</strong>, since no display can show more than 60 frames a second anyway.
                A fast desktop absorbs that waste; a mid-range laptop with six charts open, or a phone, does not —
                that headroom is exactly what keeps a trading dashboard usable when the market moves.
            </p>

            <div class="grid">
                <!-- Chart -->
                <section class="panel chart-panel">
                    <div class="panel-head">
                        <div class="symbol-tabs">
                            <button v-for="spec in SYMBOLS" :key="spec.id" class="tab"
                                :class="{ active: spec.id === selected }" @click="selected = spec.id">
                                {{ spec.id.split('/')[0] }}
                            </button>
                        </div>
                        <div class="live-price" :class="activeRow ? (activeRow.change >= 0 ? 'up' : 'down') : ''">
                            <span class="price">{{ activeRow ? formatPrice(activeRow.price) : '—' }}</span>
                            <span class="change">
                                {{ activeRow && activeRow.change >= 0 ? '+' : '' }}{{ activeRow?.change.toFixed(2) }}%
                            </span>
                        </div>
                    </div>
                    <div ref="chartWrap" class="chart-wrap">
                        <canvas ref="canvas" />
                    </div>
                    <p class="panel-foot">
                        {{ HISTORY_SIZE }}-point rolling window in a pre-allocated <code>Float64Array</code>,
                        drawn straight to canvas — the price series never enters Vue's reactivity graph.
                    </p>
                </section>

                <!-- Order book -->
                <section class="panel">
                    <div class="panel-head">
                        <h2>Order book</h2>
                        <span class="muted">{{ selected }}</span>
                    </div>
                    <div class="book">
                        <div class="book-side">
                            <div v-for="ask in book.asks" :key="'a' + ask.price" class="book-row ask">
                                <span class="depth" :style="{ width: (ask.total / book.maxTotal * 100) + '%' }" />
                                <span class="bp">{{ formatPrice(ask.price) }}</span>
                                <span class="bs">{{ ask.size.toFixed(3) }}</span>
                            </div>
                        </div>
                        <div class="book-mid">
                            <span>{{ activeRow ? formatPrice(activeRow.price) : '—' }}</span>
                            <small>mid</small>
                        </div>
                        <div class="book-side">
                            <div v-for="bid in book.bids" :key="'b' + bid.price" class="book-row bid">
                                <span class="depth" :style="{ width: (bid.total / book.maxTotal * 100) + '%' }" />
                                <span class="bp">{{ formatPrice(bid.price) }}</span>
                                <span class="bs">{{ bid.size.toFixed(3) }}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Watchlist -->
                <section class="panel">
                    <div class="panel-head">
                        <h2>Markets</h2>
                        <span class="muted">{{ SYMBOLS.length }} pairs</span>
                    </div>
                    <table class="watchlist">
                        <thead>
                            <tr>
                                <th>Pair</th>
                                <th class="num">Last</th>
                                <th class="num">Session</th>
                                <th class="num">Range</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in rows" :key="row.id" :class="{ selected: row.id === selected }"
                                @click="selected = row.id">
                                <td>
                                    <strong>{{ row.id.split('/')[0] }}</strong>
                                    <small>{{ row.name }}</small>
                                </td>
                                <td class="num mono" :class="row.direction">{{ formatPrice(row.price) }}</td>
                                <td class="num mono" :class="row.change >= 0 ? 'up' : 'down'">
                                    {{ row.change >= 0 ? '+' : '' }}{{ row.change.toFixed(2) }}%
                                </td>
                                <td class="num mono muted">
                                    {{ formatPrice(row.low) }} – {{ formatPrice(row.high) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <!-- Trade tape -->
                <section class="panel">
                    <div class="panel-head">
                        <h2>Trade tape</h2>
                        <span class="muted">last {{ TAPE_SIZE }} fills</span>
                    </div>
                    <ul class="tape">
                        <li v-for="trade in tape" :key="trade.key" :class="trade.side">
                            <span class="mono">{{ trade.id.split('/')[0] }}</span>
                            <span class="mono num">{{ formatPrice(trade.price) }}</span>
                            <span class="mono num muted">{{ trade.size.toFixed(3) }}</span>
                            <span class="tag">{{ trade.side }}</span>
                        </li>
                    </ul>
                </section>
            </div>

            <footer class="demo-foot">
                <h2>How this is built</h2>
                <div class="foot-grid">
                    <article>
                        <h3><i class="mdi mdi-layers-triple-outline" aria-hidden="true" /> Buffer, then flush</h3>
                        <p>
                            Ticks land in plain, non-reactive Maps. A single <code>requestAnimationFrame</code> loop
                            publishes one snapshot per frame, so DOM work is bounded by the display refresh rate
                            instead of by feed volume.
                        </p>
                    </article>
                    <article>
                        <h3><i class="mdi mdi-chart-areaspline" aria-hidden="true" /> Canvas over DOM</h3>
                        <p>
                            The price series lives in a pre-allocated ring buffer and is drawn imperatively to a
                            DPR-scaled canvas. Nothing is allocated per frame, so there is no sawtooth GC pattern
                            during long sessions.
                        </p>
                    </article>
                    <article>
                        <h3><i class="mdi mdi-shield-check-outline" aria-hidden="true" /> Bounded memory</h3>
                        <p>
                            History is a fixed-size rolling window and the tape is capped. A dashboard left open on a
                            trading desk all day uses the same memory at hour eight as at minute one.
                        </p>
                    </article>
                    <article>
                        <h3><i class="mdi mdi-language-typescript" aria-hidden="true" /> Typed end to end</h3>
                        <p>
                            Vue 3 + Nuxt + TypeScript, no charting library. Written for this portfolio so the code is
                            fully public — the production versions of this work sit behind client NDAs.
                        </p>
                    </article>
                </div>

                <div class="foot-cta">
                    <a class="btn btn-primary" href="/matina-safaei-resume.pdf" download>
                        <i class="mdi mdi-download-outline" aria-hidden="true" /> Download Resume (PDF)
                    </a>
                    <a class="btn btn-ghost" href="mailto:matina.safaei@gmail.com">
                        <i class="mdi mdi-email-outline" aria-hidden="true" /> Email me
                    </a>
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useColorTheme } from '~/composables/useColorTheme'
import {
    HISTORY_SIZE,
    MarketFeed,
    SYMBOLS,
    buildOrderBook,
    createSymbolState,
    formatPrice,
    pushPrice,
    readHistory,
    type SymbolState,
    type Tick,
} from '~/utils/marketFeed'

useHead({
    title: 'Live Demo — Real-Time Trading Dashboard | Matina Safaei',
    meta: [
        {
            name: 'description',
            content:
                'An interactive, no-login demo: a Vue 3 + TypeScript trading dashboard rendering ~240 simulated market ticks per second at 60fps.',
        },
    ],
})

const TARGET_TPS = 240
const TAPE_SIZE = 14
/** How often the coalesced path publishes a snapshot to the DOM. */
const PUBLISH_INTERVAL_MS = 120

interface Row {
    id: string
    name: string
    price: number
    change: number
    high: number
    low: number
    direction: 'up' | 'down' | ''
}

interface TapeEntry extends Tick {
    key: number
}

// ---- Non-reactive hot state. Nothing here is touched by Vue. ----
const states = new Map<string, SymbolState>()
SYMBOLS.forEach((spec, i) => states.set(spec.id, createSymbolState(spec, i + 1)))

const lastPrices = new Map<string, number>()
const chartBuffer = new Float64Array(HISTORY_SIZE)
let tapeBuffer: TapeEntry[] = []
let tapeKey = 0
let feed: MarketFeed | null = null
let rafId = 0
let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let cssWidth = 0
let cssHeight = 0

// Counters for the perf readout.
let frameCount = 0
let framesSinceSample = 0
let lastFpsSample = 0
let lastPublishAt = 0
let lastFrameAt = 0
let worstSinceSample = 0
let ticksSinceSample = 0
let domRendersSinceSample = 0

// ---- Reactive surface. Deliberately small: only what the DOM reads. ----
const selected = ref<string>(SYMBOLS[0]!.id)
const coalesced = ref(true)
const running = ref(true)
const fps = ref(60)
const tickRate = ref(0)
const worstFrame = ref(0)
const coalesceRatio = ref(1)
const domRate = ref(0)
const rows = shallowRef<Row[]>(buildRows())
const tape = shallowRef<TapeEntry[]>([])
// Seeded so SSR markup and the client's first paint match (no hydration mismatch).
const book = shallowRef(buildOrderBook(SYMBOLS[0]!.price, 8, 1))

const canvas = ref<HTMLCanvasElement | null>(null)
const chartWrap = ref<HTMLElement | null>(null)

const activeRow = computed(() => rows.value.find((row) => row.id === selected.value) ?? null)
const fpsClass = computed(() => (fps.value >= 50 ? 'up' : fps.value >= 30 ? 'warn' : 'down'))
const frameClass = computed(() => (worstFrame.value <= 20 ? 'up' : worstFrame.value <= 40 ? 'warn' : 'down'))

function buildRows(): Row[] {
    const next: Row[] = []
    for (const spec of SYMBOLS) {
        const state = states.get(spec.id)!
        const previous = lastPrices.get(spec.id) ?? state.price
        next.push({
            id: state.id,
            name: state.name,
            price: state.price,
            change: ((state.price - state.open) / state.open) * 100,
            high: state.high,
            low: state.low,
            direction: state.price > previous ? 'up' : state.price < previous ? 'down' : '',
        })
        lastPrices.set(spec.id, state.price)
    }
    return next
}

/** Copy the hot state into the reactive refs. One call = one Vue render pass. */
function publish(): void {
    rows.value = buildRows()
    tape.value = tapeBuffer.slice(0, TAPE_SIZE)
    const active = states.get(selected.value)
    if (active) book.value = buildOrderBook(active.price)
    domRendersSinceSample += 1
}

function onTick(tick: Tick): void {
    const state = states.get(tick.id)
    if (!state) return
    pushPrice(state, tick.price)

    tapeBuffer.unshift({ ...tick, key: tapeKey++ })
    if (tapeBuffer.length > TAPE_SIZE) tapeBuffer.length = TAPE_SIZE

    // The naive path: every single message drives a full repaint + Vue update.
    // This is what the toggle exists to demonstrate, and it is intentionally
    // the slow way to do it.
    if (!coalesced.value) {
        drawChart()
        publish()
    }
}

// ---- Canvas rendering ----
function resizeCanvas(): void {
    const el = canvas.value
    const wrap = chartWrap.value
    if (!el || !wrap) return
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    cssWidth = wrap.clientWidth
    cssHeight = wrap.clientHeight
    el.width = Math.round(cssWidth * dpr)
    el.height = Math.round(cssHeight * dpr)
    el.style.width = `${cssWidth}px`
    el.style.height = `${cssHeight}px`
    ctx = el.getContext('2d')
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
}

/** Theme colours, read from CSS variables once per theme change. */
const palette = {
    grid: 'rgba(0,0,0,0.08)',
    axis: '#666',
    up: '#22c55e',
    down: '#ef4444',
    upFill: 'rgba(34,197,94,0.2)',
    downFill: 'rgba(239,68,68,0.2)',
    onAccent: '#fff',
}

function readPalette(): void {
    const cs = getComputedStyle(document.documentElement)
    const get = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback
    palette.up = get('--up', palette.up)
    palette.down = get('--down', palette.down)
    palette.axis = get('--text-subtle', palette.axis)
    palette.grid = get('--border', '#ccc')
    palette.onAccent = get('--bg-elev', '#fff')
    palette.upFill = hexToRgba(palette.up, 0.22)
    palette.downFill = hexToRgba(palette.down, 0.22)
}

function hexToRgba(hex: string, alpha: number): string {
    const m = hex.replace('#', '')
    if (m.length !== 6) return hex
    const r = parseInt(m.slice(0, 2), 16)
    const g = parseInt(m.slice(2, 4), 16)
    const b = parseInt(m.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function drawChart(): void {
    const state = states.get(selected.value)
    if (!ctx || !state || cssWidth === 0 || cssHeight === 0) return

    const series = readHistory(state, chartBuffer)
    const padLeft = 8
    const padRight = 78
    const padTop = 14
    const padBottom = 20
    const plotW = cssWidth - padLeft - padRight
    const plotH = cssHeight - padTop - padBottom

    let min = Infinity
    let max = -Infinity
    for (let i = 0; i < series.length; i += 1) {
        const v = series[i]!
        if (v < min) min = v
        if (v > max) max = v
    }
    const span = max - min || max * 0.001 || 1
    min -= span * 0.12
    max += span * 0.12
    const range = max - min

    const x = (i: number) => padLeft + (i / (series.length - 1)) * plotW
    const y = (v: number) => padTop + (1 - (v - min) / range) * plotH

    ctx.clearRect(0, 0, cssWidth, cssHeight)

    // Horizontal grid + price axis
    ctx.strokeStyle = palette.grid
    ctx.fillStyle = palette.axis
    ctx.lineWidth = 1
    ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    for (let g = 0; g <= 4; g += 1) {
        const value = max - (range / 4) * g
        const gy = Math.round(y(value)) + 0.5
        ctx.beginPath()
        ctx.moveTo(padLeft, gy)
        ctx.lineTo(padLeft + plotW, gy)
        ctx.stroke()
        ctx.fillText(formatPrice(value), padLeft + plotW + 8, gy)
    }

    const rising = series[series.length - 1]! >= series[0]!
    const stroke = rising ? palette.up : palette.down

    // Filled area under the line
    const gradient = ctx.createLinearGradient(0, padTop, 0, padTop + plotH)
    gradient.addColorStop(0, rising ? palette.upFill : palette.downFill)
    gradient.addColorStop(1, hexToRgba(rising ? palette.up : palette.down, 0))

    ctx.beginPath()
    ctx.moveTo(x(0), y(series[0]!))
    for (let i = 1; i < series.length; i += 1) ctx.lineTo(x(i), y(series[i]!))
    ctx.lineTo(x(series.length - 1), padTop + plotH)
    ctx.lineTo(x(0), padTop + plotH)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // The price line itself
    ctx.beginPath()
    ctx.moveTo(x(0), y(series[0]!))
    for (let i = 1; i < series.length; i += 1) ctx.lineTo(x(i), y(series[i]!))
    ctx.strokeStyle = stroke
    ctx.lineWidth = 1.6
    ctx.lineJoin = 'round'
    ctx.stroke()

    // Last-price marker and tag
    const lastValue = series[series.length - 1]!
    const ly = y(lastValue)
    ctx.setLineDash([3, 4])
    ctx.strokeStyle = hexToRgba(rising ? palette.up : palette.down, 0.45)
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padLeft, ly)
    ctx.lineTo(padLeft + plotW, ly)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = stroke
    ctx.beginPath()
    ctx.arc(x(series.length - 1), ly, 3, 0, Math.PI * 2)
    ctx.fill()

    const label = formatPrice(lastValue)
    const labelW = ctx.measureText(label).width + 12
    ctx.fillStyle = stroke
    ctx.beginPath()
    // roundRect is unavailable on older Safari; a plain rect is a fine fallback.
    if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(padLeft + plotW + 4, ly - 9, labelW, 18, 4)
    } else {
        ctx.rect(padLeft + plotW + 4, ly - 9, labelW, 18)
    }
    ctx.fill()
    ctx.fillStyle = palette.onAccent
    ctx.fillText(label, padLeft + plotW + 10, ly)
}

// ---- The single render loop ----
function frame(now: number): void {
    if (lastFrameAt !== 0) {
        const delta = now - lastFrameAt
        if (delta > worstSinceSample) worstSinceSample = delta
    }
    lastFrameAt = now
    frameCount += 1
    framesSinceSample += 1

    if (coalesced.value) {
        drawChart()
        if (now - lastPublishAt >= PUBLISH_INTERVAL_MS) {
            lastPublishAt = now
            publish()
        }
    }

    // Refresh the perf readout once a second — itself a coalesced update.
    if (now - lastFpsSample >= 1000) {
        const elapsed = (now - lastFpsSample) / 1000
        fps.value = Math.round(framesSinceSample / elapsed)
        const ticks = feed?.drainCount() ?? 0
        ticksSinceSample = Math.round(ticks / elapsed)
        tickRate.value = ticksSinceSample
        worstFrame.value = worstSinceSample
        domRate.value = Math.round(domRendersSinceSample / elapsed)
        // Only sample this while coalescing is on. In naive mode the ratio is
        // 1 by definition, and showing that would undercut the comparison the
        // surrounding copy is drawing.
        if (coalesced.value && domRendersSinceSample > 0) {
            coalesceRatio.value = Math.max(1, Math.round(ticks / domRendersSinceSample))
        }

        framesSinceSample = 0
        worstSinceSample = 0
        domRendersSinceSample = 0
        lastFpsSample = now
    }

    rafId = requestAnimationFrame(frame)
}

function toggleFeed(): void {
    if (!feed) return
    if (feed.running) {
        feed.stop()
        running.value = false
    } else {
        feed.start()
        running.value = true
    }
}

// Redraw immediately on symbol change so the chart never shows stale data.
watch(selected, () => {
    drawChart()
    publish()
})

// Re-read colours and repaint when the theme changes.
const { theme } = useColorTheme()
watch(theme, () => {
    readPalette()
    drawChart()
})

let observer: ResizeObserver | null = null

onMounted(() => {
    readPalette()
    resizeCanvas()
    observer = new ResizeObserver(() => {
        resizeCanvas()
        drawChart()
    })
    if (chartWrap.value) observer.observe(chartWrap.value)

    feed = new MarketFeed(SYMBOLS, { ticksPerSecond: TARGET_TPS, onTick })
    feed.start()

    lastFpsSample = performance.now()
    lastPublishAt = lastFpsSample
    rafId = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
    cancelAnimationFrame(rafId)
    feed?.stop()
    observer?.disconnect()
    tapeBuffer = []
})
</script>

<style scoped>
.demo {
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    padding: var(--space-6) var(--space-4) var(--space-8);
}

.shell {
    max-width: var(--page-max);
    margin: 0 auto;
}

/* ---- Head ---- */
.demo-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    flex-wrap: wrap;
    margin-bottom: var(--space-5);
}

.back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: 40px;
    color: var(--text-muted);
    text-decoration: none;
    font-size: var(--text-sm);
    font-weight: 600;
    transition: color var(--dur) var(--ease);
}

.back:hover {
    color: var(--accent);
    text-decoration: underline;
}

.demo-head h1 {
    font-size: var(--text-h1);
    margin: var(--space-2) 0 var(--space-3);
}

.lede {
    max-width: 62ch;
    line-height: var(--leading-normal);
    color: var(--text-muted);
    margin: 0;
}

.sim-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--bg-elev);
    border: 1px solid var(--border-control);
    color: var(--text-muted);
    font-size: var(--text-label);
    font-weight: 600;
    letter-spacing: 0.02em;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-full);
    white-space: nowrap;
}

/* ---- Perf bar ---- */
.perf {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-5);
    padding: var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--bg-elev);
}

.stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 100px;
}

.stat-label {
    font-size: var(--text-label);
    text-transform: uppercase;
    letter-spacing: var(--track-label);
    color: var(--text-subtle);
    font-weight: 600;
}

.stat-value {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
}

.stat-value small {
    font-size: var(--text-label);
    font-weight: 500;
    color: var(--text-subtle);
}

.perf-controls {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-left: auto;
    flex-wrap: wrap;
}

.switch {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--text);
    cursor: pointer;
    min-height: 44px;
    padding: 0 var(--space-4);
    border-radius: var(--radius-full);
    border: 1px solid var(--border-control);
    background: var(--bg);
    transition: border-color var(--dur) var(--ease), color var(--dur) var(--ease);
}

.switch.danger {
    border-color: var(--down);
    color: var(--down);
}

.switch input {
    accent-color: var(--accent);
    width: 16px;
    height: 16px;
}

.ghost-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 44px;
    padding: 0 var(--space-4);
    border-radius: var(--radius-full);
    border: 1px solid var(--border-control);
    background: var(--bg);
    color: var(--text);
    font-family: inherit;
    font-weight: 600;
    font-size: var(--text-sm);
    cursor: pointer;
    transition: background-color var(--dur) var(--ease), border-color var(--dur) var(--ease);
}

.ghost-btn:hover {
    background: var(--bg-subtle);
    border-color: var(--accent);
}

.perf-hint {
    margin: var(--space-4) 0 var(--space-5);
    color: var(--text-muted);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    max-width: 88ch;
}

.perf-hint i {
    margin-right: var(--space-1);
    color: var(--warn);
}

.perf-hint strong {
    color: var(--text);
}

/* ---- Grid ---- */
.grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-4);
}

.panel {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--bg-elev);
    padding: var(--space-4);
    overflow: hidden;
}

.chart-panel {
    display: flex;
    flex-direction: column;
}

.panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
    flex-wrap: wrap;
}

.panel-head h2 {
    font-size: var(--text-h3);
    margin: 0;
}

.panel-foot {
    margin: var(--space-3) 0 0;
    font-size: var(--text-label);
    color: var(--text-subtle);
    line-height: var(--leading-snug);
}

.panel-foot code,
.foot-grid code {
    background: var(--bg-subtle);
    color: var(--text-muted);
    padding: 1px var(--space-1);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 0.92em;
}

.muted {
    color: var(--text-subtle);
    font-size: var(--text-sm);
}

/* ---- Chart ---- */
.symbol-tabs {
    display: flex;
    gap: var(--space-1);
    flex-wrap: wrap;
}

.tab {
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text-muted);
    font-family: inherit;
    font-weight: 600;
    font-size: var(--text-label);
    letter-spacing: 0.02em;
    min-height: 32px;
    padding: 0 var(--space-3);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease),
        border-color var(--dur) var(--ease);
}

.tab:hover {
    border-color: var(--accent);
    color: var(--text);
}

.tab.active {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--on-accent);
}

.live-price {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
}

.live-price .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
}

.live-price .change {
    font-size: var(--text-sm);
    font-weight: 700;
}

.live-price.up .price,
.live-price.up .change {
    color: var(--up);
}

.live-price.down .price,
.live-price.down .change {
    color: var(--down);
}

.chart-wrap {
    position: relative;
    width: 100%;
    flex: 1;
    min-height: 320px;
}

.chart-wrap canvas {
    display: block;
}

/* ---- Order book ---- */
.book {
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.book-row {
    position: relative;
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    font-size: var(--text-label);
    padding: 3px var(--space-2);
    border-radius: var(--radius-sm);
}

.book-row .depth {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: var(--radius-sm);
    opacity: 0.16;
}

.book-row.ask .depth {
    background: var(--down);
}

.book-row.bid .depth {
    background: var(--up);
}

.book-row .bp,
.book-row .bs {
    position: relative;
}

.book-row.ask .bp {
    color: var(--down);
}

.book-row.bid .bp {
    color: var(--up);
}

.book-row .bs {
    color: var(--text-muted);
}

.book-mid {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    padding: var(--space-2);
    margin: var(--space-1) 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    color: var(--text);
}

.book-mid small {
    color: var(--text-subtle);
    font-weight: 500;
}

/* ---- Watchlist ---- */
.watchlist {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--text-sm);
}

.watchlist th {
    text-align: left;
    font-size: var(--text-label);
    text-transform: uppercase;
    letter-spacing: var(--track-label);
    color: var(--text-subtle);
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--border);
    font-weight: 600;
}

.watchlist td {
    padding: var(--space-2) 0;
    border-bottom: 1px solid var(--border);
    color: var(--text);
}

.watchlist tbody tr {
    cursor: pointer;
    transition: background-color var(--dur-fast) var(--ease);
}

.watchlist tbody tr:hover {
    background: var(--bg-subtle);
}

.watchlist tr.selected {
    background: var(--accent-soft);
}

.watchlist td small {
    display: block;
    color: var(--text-subtle);
    font-size: var(--text-label);
}

.num {
    text-align: right;
}

.mono {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
}

.up {
    color: var(--up);
}

.down {
    color: var(--down);
}

.warn {
    color: var(--warn);
}

/* ---- Tape ---- */
.tape {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.tape li {
    display: grid;
    grid-template-columns: 1fr 1.2fr 1fr auto;
    gap: var(--space-2);
    align-items: center;
    font-size: var(--text-label);
    padding: 3px var(--space-2);
    border-radius: var(--radius-sm);
    color: var(--text);
}

.tape li.buy {
    background: color-mix(in srgb, var(--up) 12%, transparent);
}

.tape li.sell {
    background: color-mix(in srgb, var(--down) 12%, transparent);
}

.tape .tag {
    font-size: 0.625rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.05em;
}

.tape li.buy .tag {
    color: var(--up);
}

.tape li.sell .tag {
    color: var(--down);
}

/* ---- Footer ---- */
.demo-foot {
    margin-top: var(--space-6);
    padding: var(--space-5);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--bg-elev);
}

.demo-foot h2 {
    margin: 0 0 var(--space-4);
    font-size: var(--text-h2);
}

.foot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: var(--space-5);
}

.foot-grid h3 {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
    margin: 0 0 var(--space-2);
    color: var(--accent);
}

.foot-grid p {
    margin: 0;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--text-muted);
}

.foot-cta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-5);
    padding-top: var(--space-4);
    border-top: 1px solid var(--border);
}

/* ---- Responsive ---- */
@media (max-width: 980px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .demo {
        padding: var(--space-4) var(--space-3) var(--space-7);
    }

    .perf {
        gap: var(--space-4);
        padding: var(--space-3);
    }

    .stat {
        min-width: 84px;
    }

    .stat-value {
        font-size: 1.0625rem;
    }

    .perf-controls {
        margin-left: 0;
        width: 100%;
    }

    .switch,
    .ghost-btn {
        flex: 1;
        justify-content: center;
    }

    .chart-wrap {
        min-height: 240px;
    }

    .live-price .price {
        font-size: 1.15rem;
    }

    .watchlist th:last-child,
    .watchlist td:last-child {
        display: none;
    }
}
</style>
