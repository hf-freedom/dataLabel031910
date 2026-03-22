import { ref, computed } from 'vue'

export function useTableSelection<T extends { id: string }>() {
  const selectedRows = ref<T[]>([])
  const selectedIds = computed(() => selectedRows.value.map(row => row.id))

  const handleSelectionChange = (rows: T[]) => {
    selectedRows.value = rows
  }

  const clearSelection = () => {
    selectedRows.value = []
  }

  const isSelected = (id: string) => {
    return selectedIds.value.includes(id)
  }

  const toggleRowSelection = (row: T) => {
    const index = selectedRows.value.findIndex(r => r.id === row.id)
    if (index > -1) {
      selectedRows.value.splice(index, 1)
    } else {
      selectedRows.value.push(row)
    }
  }

  return {
    selectedRows,
    selectedIds,
    handleSelectionChange,
    clearSelection,
    isSelected,
    toggleRowSelection
  }
}
