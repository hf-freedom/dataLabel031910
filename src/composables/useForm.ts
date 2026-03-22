import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

export const useForm = <T extends Record<string, any>>(
  initialFormData: T,
  rules?: FormRules
) => {
  const formRef = ref<FormInstance>()
  const visible = ref(false)
  const title = ref('')

  const formData = reactive<T>({ ...initialFormData })

  const openDialog = (newTitle?: string, data?: Partial<T>) => {
    if (newTitle) {
      title.value = newTitle
    }
    if (data) {
      Object.assign(formData, data)
    }
    visible.value = true
  }

  const closeDialog = () => {
    visible.value = false
    resetForm()
  }

  const resetForm = () => {
    formRef.value?.resetFields()
    Object.keys(formData).forEach((key) => {
      ;(formData as Record<string, any>)[key] = initialFormData[key as keyof T]
    })
  }

  const validate = async (): Promise<boolean> => {
    if (!formRef.value) return false
    try {
      await formRef.value.validate()
      return true
    } catch {
      return false
    }
  }

  const setFormData = (data: Partial<T>) => {
    Object.assign(formData, data)
  }

  const getFormData = () => {
    return formData
  }

  return {
    formRef,
    formData,
    visible,
    title,
    rules,
    openDialog,
    closeDialog,
    resetForm,
    validate,
    setFormData,
    getFormData
  }
}
