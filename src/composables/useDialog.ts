import { ref, type Ref } from 'vue'
import { type FormInstance } from 'element-plus'

export interface DialogOptions {
  onOpen?: () => void
  onClose?: () => void
}

export function useDialog(options: DialogOptions = {}) {
  const visible = ref(false)
  const title = ref('')

  const open = (dialogTitle?: string) => {
    title.value = dialogTitle || ''
    visible.value = true
    options.onOpen?.()
  }

  const close = () => {
    visible.value = false
    options.onClose?.()
  }

  const toggle = () => {
    visible.value = !visible.value
  }

  return {
    visible,
    title,
    open,
    close,
    toggle
  }
}

export function useFormDialog<T extends Record<string, any>>(
  defaultValues: T,
  options: DialogOptions = {}
) {
  const { visible, title, open: baseOpen, close: baseClose } = useDialog(options)
  const formRef = ref<FormInstance>()
  const formData = ref<T>({ ...defaultValues } as T) as Ref<T>

  const open = (data?: Partial<T>, dialogTitle?: string) => {
    if (data) {
      Object.assign(formData.value, data)
    } else {
      resetForm()
    }
    baseOpen(dialogTitle)
  }

  const close = () => {
    resetForm()
    baseClose()
  }

  const resetForm = () => {
    formData.value = { ...defaultValues } as T
    formRef.value?.resetFields()
  }

  const validate = async (): Promise<boolean> => {
    if (!formRef.value) return false
    return new Promise((resolve) => {
      formRef.value!.validate((valid) => {
        resolve(valid)
      })
    })
  }

  return {
    visible,
    title,
    formRef,
    formData,
    open,
    close,
    resetForm,
    validate
  }
}
