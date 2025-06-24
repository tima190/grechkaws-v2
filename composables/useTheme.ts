import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<'light' | 'dark'>('light')

  const applyTheme = (theme: 'light' | 'dark') => {
    if (process.client) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
    currentTheme.value = theme
  }

  const toggleTheme = () => {
    const nextTheme = currentTheme.value === 'light' ? 'dark' : 'light'
    applyTheme(nextTheme)
  }

  const initTheme = () => {
    if (process.client) {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' || 'light'
      applyTheme(saved)
    }
  }

  // Инициализация на клиенте
  if (process.client) {
    onMounted(() => {
      initTheme()
    })
  }

  return {
    currentTheme,
    toggleTheme,
    applyTheme,
    initTheme
  }
})
