import { reactive, ref } from 'vue'
import type { PageParams } from '@/types'
import { PAGE_SIZES } from '@/constants'

export const usePagination = (defaultPageSize = 10) => {
  const loading = ref(false)

  const pagination = reactive<PageParams & { total: number; pageSizes: number[] }>({
    page: 1,
    pageSize: defaultPageSize,
    total: 0,
    pageSizes: [...PAGE_SIZES]
  })

  const handleSizeChange = (size: number) => {
    pagination.pageSize = size
    pagination.page = 1
  }

  const handleCurrentChange = (page: number) => {
    pagination.page = page
  }

  const reset = () => {
    pagination.page = 1
    pagination.pageSize = defaultPageSize
    pagination.total = 0
  }

  const setTotal = (total: number) => {
    pagination.total = total
  }

  const getParams = () => ({
    page: pagination.page,
    pageSize: pagination.pageSize
  })

  return {
    loading,
    pagination,
    handleSizeChange,
    handleCurrentChange,
    reset,
    setTotal,
    getParams
  }
}
