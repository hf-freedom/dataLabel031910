import { ref, reactive, type UnwrapNestedRefs } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { PageResult } from '@/types'
import { usePagination } from './usePagination'

interface CrudOptions<T, Q, F> {
  api: {
    list: (params: Q & { page: number; pageSize: number }) => Promise<PageResult<T>>
    create?: (data: F) => Promise<any>
    update?: (data: F) => Promise<any>
    delete?: (id: string) => Promise<any>
    detail?: (id: string) => Promise<T>
  }
  initialQuery: Q
  initialForm: F
  onDeleteSuccess?: () => void
  onSubmitSuccess?: () => void
}

export const useCrud = <T extends { id?: string }, Q extends object, F extends object>(
  options: CrudOptions<T, Q, F>
) => {
  const { api, initialQuery, initialForm, onDeleteSuccess, onSubmitSuccess } = options

  const tableData = ref<T[]>([])
  const currentRow = ref<T | null>(null)
  const detailVisible = ref(false)

  const { loading, pagination, handleSizeChange, handleCurrentChange, setTotal, getParams, reset: resetPagination } = usePagination()

  const queryForm = reactive<Q>({ ...initialQuery })

  const handleQuery = async () => {
    loading.value = true
    try {
      const params = {
        ...queryForm,
        ...getParams()
      }
      const res = await api.list(params)
      tableData.value = res.list
      setTotal(res.total)
    } catch (error) {
      console.error('Query failed:', error)
    } finally {
      loading.value = false
    }
  }

  const handleReset = () => {
    Object.assign(queryForm, initialQuery)
    resetPagination()
    handleQuery()
  }

  const handleDelete = async (row: T, message = '确定要删除该记录吗？') => {
    if (!api.delete || !row.id) return
    try {
      await ElMessageBox.confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await api.delete(row.id)
      ElMessage.success('删除成功')
      onDeleteSuccess?.()
      handleQuery()
    } catch {
      // User cancelled
    }
  }

  const handleView = (row: T) => {
    currentRow.value = row
    detailVisible.value = true
  }

  const handleEdit = async (row: T) => {
    if (api.detail && row.id) {
      const detail = await api.detail(row.id)
      currentRow.value = detail
    } else {
      currentRow.value = row
    }
  }

  const handleSubmit = async (formData: UnwrapNestedRefs<F>, isEdit = false) => {
    try {
      if (isEdit && api.update) {
        await api.update(formData)
      } else if (!isEdit && api.create) {
        await api.create(formData)
      }
      ElMessage.success(isEdit ? '修改成功' : '添加成功')
      onSubmitSuccess?.()
      handleQuery()
      return true
    } catch (error) {
      console.error('Submit failed:', error)
      return false
    }
  }

  return {
    tableData,
    loading,
    pagination,
    queryForm,
    currentRow,
    detailVisible,
    handleQuery,
    handleReset,
    handleDelete,
    handleView,
    handleEdit,
    handleSubmit,
    handleSizeChange,
    handleCurrentChange
  }
}
