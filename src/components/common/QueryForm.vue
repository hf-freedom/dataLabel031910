<template>
  <el-form :inline="true" :model="model" class="query-form">
    <slot />
    <el-form-item>
      <el-button type="primary" @click="handleQuery">
        <el-icon><Search /></el-icon>
        查询
      </el-button>
      <el-button @click="handleReset">
        <el-icon><Refresh /></el-icon>
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
interface Props {
  model: Record<string, any>
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'query'): void
  (e: 'reset'): void
}>()

const handleQuery = () => {
  emit('query')
}

const handleReset = () => {
  emit('reset')
}
</script>

<style scoped>
.query-form {
  margin-bottom: 20px;
}
</style>
