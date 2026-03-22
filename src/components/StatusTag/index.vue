<template>
  <el-tag :type="tagType" :size="size">
    {{ tagText }}
  </el-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface StatusTagProps {
  status: string
  typeMap: Record<string, string>
  textMap: Record<string, string>
  size?: 'large' | 'default' | 'small'
}

const props = defineProps<StatusTagProps>()

const tagType = computed(() => {
  return props.typeMap[props.status] || 'info'
})

const tagText = computed(() => {
  return props.textMap[props.status] || props.status
})
</script>

<style scoped lang="scss">
</style>
