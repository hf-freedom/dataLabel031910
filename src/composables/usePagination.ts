import { ref, reactive } from 'vue'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants'

export function usePagination() {
  const pagination = reactive({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0
  })

  const resetPagination = () => {
    pagination.page = DEFAULT_PAGE
    pagination.pageSize = DEFAULT_PAGE_SIZE
  }

  const setTotal = (total: number) => {
    pagination.total = total
  }

  return {
    pagination,
    resetPagination,
    setTotal
  }
}
