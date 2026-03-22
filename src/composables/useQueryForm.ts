import { reactive } from 'vue'

export function useQueryForm<T extends Record<string, any>>(initialValues: T) {
  const queryForm = reactive<T>({ ...initialValues } as T)

  const resetQueryForm = (callback?: () => void) => {
    Object.keys(queryForm).forEach(key => {
      const k = key as keyof T
      if (Array.isArray(initialValues[k])) {
        (queryForm as any)[k] = []
      } else {
        (queryForm as any)[k] = initialValues[k]
      }
    })
    callback?.()
  }

  const getQueryParams = (): T => {
    const params = { ...queryForm } as T
    Object.keys(params).forEach(key => {
      const k = key as keyof T
      if (params[k] === '' || params[k] === undefined || params[k] === null) {
        delete params[k]
      }
    })
    return params
  }

  return {
    queryForm,
    resetQueryForm,
    getQueryParams
  }
}
