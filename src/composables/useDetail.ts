import { ref } from 'vue'

export const useDetail = <T>() => {
  const visible = ref(false)
  const detailData = ref<T | null>(null)

  const openDetail = (data: T) => {
    detailData.value = data
    visible.value = true
  }

  const closeDetail = () => {
    visible.value = false
    detailData.value = null
  }

  return {
    visible,
    detailData,
    openDetail,
    closeDetail
  }
}
