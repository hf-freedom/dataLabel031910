import { reactive, ref } from 'vue'

export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

export function usePagination(initialPage = 1, initialPageSize = 10) {
  const pagination = reactive<PaginationState>({
    page: initialPage,
    pageSize: initialPageSize,
    total: 0
  })

  const handleSizeChange = (size: number, callback?: () => void) => {
    pagination.pageSize = size
    callback?.()
  }

  const handleCurrentChange = (page: number, callback?: () => void) => {
    pagination.page = page
    callback?.()
  }

  const setTotal = (total: number) => {
    pagination.total = total
  }

  const resetPagination = () => {
    pagination.page = initialPage
    pagination.pageSize = initialPageSize
    pagination.total = 0
  }

  return {
    pagination,
    handleSizeChange,
    handleCurrentChange,
    setTotal,
    resetPagination
  }
}
