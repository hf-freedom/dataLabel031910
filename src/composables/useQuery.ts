import { ref, reactive } from 'vue'
import { useLoading } from './useLoading'
import { usePagination } from './usePagination'

interface UseQueryOptions<T, Q> {
  initialQuery?: Q
  fetchFn: (query: Q, page: number, pageSize: number, signal?: AbortSignal) => Promise<{ list: T[]; total: number }>
  immediate?: boolean
}

export function useQuery<T, Q extends Record<string, any>>(options: UseQueryOptions<T, Q>) {
  const { initialQuery = {} as Q, fetchFn, immediate = false } = options
  const { loading, startLoading, stopLoading } = useLoading()
  const { pagination, resetPagination, setTotal } = usePagination()

  const queryForm = reactive<Q>({ ...initialQuery })
  const dataList = ref<T[]>([])
  const abortController = ref<AbortController | null>(null)

  const fetchData = async () => {
    if (abortController.value) {
      abortController.value.abort()
    }
    abortController.value = new AbortController()

    startLoading()
    try {
      const { list, total } = await fetchFn(
        queryForm,
        pagination.page,
        pagination.pageSize,
        abortController.value.signal
      )
      dataList.value = list
      setTotal(total)
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        throw error
      }
    } finally {
      stopLoading()
    }
  }

  const handleQuery = () => {
    pagination.page = 1
    return fetchData()
  }

  const handleReset = () => {
    Object.keys(queryForm).forEach(key => {
      const initialValue = (initialQuery as any)[key]
      ;(queryForm as any)[key] = initialValue !== undefined ? initialValue : ''
    })
    resetPagination()
    return fetchData()
  }

  const handleSizeChange = () => {
    return fetchData()
  }

  const handleCurrentChange = () => {
    return fetchData()
  }

  const cancelRequest = () => {
    if (abortController.value) {
      abortController.value.abort()
      abortController.value = null
    }
  }

  if (immediate) {
    fetchData()
  }

  return {
    loading,
    queryForm,
    dataList,
    pagination,
    fetchData,
    handleQuery,
    handleReset,
    handleSizeChange,
    handleCurrentChange,
    cancelRequest
  }
}
