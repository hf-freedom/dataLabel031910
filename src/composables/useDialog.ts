import { ref } from 'vue'

export function useDialog(title = '') {
  const visible = ref(false)
  const dialogTitle = ref(title)

  const open = (newTitle?: string) => {
    if (newTitle) {
      dialogTitle.value = newTitle
    }
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  return {
    visible,
    dialogTitle,
    open,
    close
  }
}
