import { computed, onMounted, ref } from 'vue'

export type ThemeName = 'light' | 'dark'

const STORAGE_KEY = 'ms-theme'

/**
 * Shared across every caller, so the header toggle and any other consumer
 * observe the same value. Initialised to the same default the inline script in
 * nuxt.config uses, so server markup and first client paint agree.
 */
const current = ref<ThemeName>('dark')
let bound = false

function apply(theme: ThemeName): void {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function useColorTheme() {
  onMounted(() => {
    if (bound) return
    bound = true
    // The inline script already resolved and applied the theme before paint;
    // read it back rather than recomputing and risking a mismatch.
    const applied = document.documentElement.dataset.theme
    current.value = applied === 'light' ? 'light' : 'dark'
  })

  function setTheme(theme: ThemeName): void {
    current.value = theme
    apply(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Private mode or blocked storage: the choice just won't persist.
    }
  }

  function toggle(): void {
    setTheme(current.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme: computed(() => current.value),
    isDark: computed(() => current.value === 'dark'),
    setTheme,
    toggle,
  }
}
