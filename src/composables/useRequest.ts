import { ref, onUnmounted } from 'vue'

interface RequestState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useRequest<T>() {
  const state = ref<RequestState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const abortController = ref<AbortController | null>(null)

  const execute = async (
    requestFn: (signal?: AbortSignal) => Promise<T>,
    options?: {
      onSuccess?: (data: T) => void
      onError?: (error: Error) => void
    }
  ): Promise<T | null> => {
    abortController.value?.abort()
    abortController.value = new AbortController()

    state.value.loading = true
    state.value.error = null

    try {
      const data = await requestFn(abortController.value.signal)
      state.value.data = data
      options?.onSuccess?.(data)
      return data
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        state.value.error = error
        options?.onError?.(error)
      }
      return null
    } finally {
      state.value.loading = false
    }
  }

  const abort = () => {
    abortController.value?.abort()
    abortController.value = null
  }

  const reset = () => {
    state.value = { data: null, loading: false, error: null }
    abort()
  }

  onUnmounted(() => {
    abort()
  })

  return {
    state,
    execute,
    abort,
    reset
  }
}
