import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface AppSettings {
  theme: 'light' | 'dark'
  language: 'zh-CN' | 'en-US'
  showBreadcrumb: boolean
  showFooter: boolean
  fixedHeader: boolean
  showLogo: boolean
}

const defaultSettings: AppSettings = {
  theme: 'light',
  language: 'zh-CN',
  showBreadcrumb: true,
  showFooter: true,
  fixedHeader: true,
  showLogo: true
}

const STORAGE_KEY = 'app-settings'

function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) }
    }
  } catch {
    console.error('Failed to load settings')
  }
  return { ...defaultSettings }
}

export const useAppStore = defineStore('app', () => {
  const settings = ref<AppSettings>(loadSettings())
  const loading = ref(false)
  const fullscreen = ref(false)

  const theme = computed(() => settings.value.theme)
  const language = computed(() => settings.value.language)

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    settings.value = { ...settings.value, ...newSettings }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
  }

  const setTheme = (theme: 'light' | 'dark') => {
    updateSettings({ theme })
  }

  const setLanguage = (language: 'zh-CN' | 'en-US') => {
    updateSettings({ language })
  }

  const toggleFullscreen = () => {
    fullscreen.value = !fullscreen.value
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  return {
    settings,
    loading,
    fullscreen,
    theme,
    language,
    updateSettings,
    setTheme,
    setLanguage,
    toggleFullscreen,
    setLoading
  }
})
