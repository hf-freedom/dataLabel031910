import { ref, onUnmounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

export function useConfirm() {
  const confirm = async (
    message: string,
    title = '提示',
    options?: {
      confirmText?: string
      cancelText?: string
      type?: 'warning' | 'info' | 'success' | 'error'
    }
  ): Promise<boolean> => {
    try {
      await ElMessageBox.confirm(message, title, {
        confirmButtonText: options?.confirmText || '确定',
        cancelButtonText: options?.cancelText || '取消',
        type: options?.type || 'warning'
      })
      return true
    } catch {
      return false
    }
  }

  const confirmDelete = async (itemName = '该数据'): Promise<boolean> => {
    return confirm(`确定要删除${itemName}吗？`, '删除确认', { type: 'warning' })
  }

  return {
    confirm,
    confirmDelete
  }
}

export function useMessage() {
  const success = (message: string) => {
    ElMessage.success(message)
  }

  const error = (message: string) => {
    ElMessage.error(message)
  }

  const warning = (message: string) => {
    ElMessage.warning(message)
  }

  const info = (message: string) => {
    ElMessage.info(message)
  }

  return {
    success,
    error,
    warning,
    info
  }
}
