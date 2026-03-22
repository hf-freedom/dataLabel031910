import { ref } from 'vue'

export const useTabs = (defaultTab = '') => {
  const activeTab = ref(defaultTab)

  const handleTabChange = (tab: string) => {
    activeTab.value = tab
  }

  return {
    activeTab,
    handleTabChange
  }
}
