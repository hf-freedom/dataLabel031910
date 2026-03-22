<template>
  <el-tag
    :type="type"
    :size="size"
    :effect="effect"
  >
    {{ text }}
  </el-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  status: string
  statusMap: Record<string, { text: string; type: string }>
  size?: 'large' | 'default' | 'small'
  effect?: 'dark' | 'light' | 'plain'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  effect: 'light'
})

const text = computed(() => {
  return props.statusMap[props.status]?.text || props.status
})

const type = computed(() => {
  return props.statusMap[props.status]?.type || 'info'
})
</script>
