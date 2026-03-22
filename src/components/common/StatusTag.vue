<template>
  <el-tag :type="type" size="small">
    {{ text }}
  </el-tag>
</template>

<script setup lang="ts">
interface Props {
  type?: 'success' | 'warning' | 'danger' | 'info' | 'primary'
  text: string
}

withDefaults(defineProps<Props>(), {
  type: 'info'
})
</script>
