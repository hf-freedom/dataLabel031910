import { ref } from 'vue'

export function useLoading(initialValue = false) {
  const loading = ref(initialValue)

  const startLoading = () => {
    loading.value = true
  }

  const stopLoading = () => {
    loading.value = false
  }

  return {
    loading,
    startLoading,
    stopLoading
  }
}
