import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface TabItem {
  path: string
  title: string
  closable?: boolean
  icon?: string
}

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabItem[]>([
    { path: '/dashboard', title: '首页', closable: false, icon: 'HomeFilled' }
  ])
  const activeTab = ref('/dashboard')

  const currentTab = computed(() => {
    return tabs.value.find(tab => tab.path === activeTab.value)
  })

  const addTab = (tab: TabItem) => {
    const exists = tabs.value.find(t => t.path === tab.path)
    if (!exists) {
      tabs.value.push({ ...tab, closable: tab.closable ?? true })
    }
    activeTab.value = tab.path
  }

  const removeTab = (path: string) => {
    const index = tabs.value.findIndex(t => t.path === path)
    if (index > -1 && tabs.value[index].closable !== false) {
      tabs.value.splice(index, 1)
      if (activeTab.value === path) {
        const newActive = tabs.value[Math.min(index, tabs.value.length - 1)]
        activeTab.value = newActive?.path || '/dashboard'
      }
    }
    return activeTab.value
  }

  const closeOtherTabs = (path: string) => {
    tabs.value = tabs.value.filter(t => t.path === path || t.closable === false)
    activeTab.value = path
  }

  const closeAllTabs = () => {
    tabs.value = tabs.value.filter(t => t.closable === false)
    activeTab.value = tabs.value[0]?.path || '/dashboard'
    return activeTab.value
  }

  const closeRightTabs = (path: string) => {
    const index = tabs.value.findIndex(t => t.path === path)
    if (index > -1) {
      tabs.value = tabs.value.slice(0, index + 1)
      if (!tabs.value.find(t => t.path === activeTab.value)) {
        activeTab.value = path
      }
    }
  }

  const setActiveTab = (path: string) => {
    activeTab.value = path
  }

  return {
    tabs,
    activeTab,
    currentTab,
    addTab,
    removeTab,
    closeOtherTabs,
    closeAllTabs,
    closeRightTabs,
    setActiveTab
  }
})
