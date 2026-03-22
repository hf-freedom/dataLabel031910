import { ref, onUnmounted } from 'vue'

export function useTab(defaultTab: string) {
  const activeTab = ref(defaultTab)

  const handleTabChange = (tab: string, callback?: () => void) => {
    activeTab.value = tab
    callback?.()
  }

  const resetTab = () => {
    activeTab.value = defaultTab
  }

  return {
    activeTab,
    handleTabChange,
    resetTab
  }
}
