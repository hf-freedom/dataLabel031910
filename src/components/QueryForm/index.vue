<template>
  <div class="query-form-wrapper">
    <el-form
      :inline="true"
      :model="modelValue"
    >
      <slot />
      <el-form-item>
        <el-button
          type="primary"
          @click="handleQuery"
        >
          查询
        </el-button>
        <el-button @click="handleReset">
          重置
        </el-button>
        <slot name="extra-buttons" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: Record<string, any>
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
  query: []
  reset: []
}>()

const handleQuery = () => {
  emit('query')
}

const handleReset = () => {
  emit('reset')
}
</script>

<style scoped lang="scss">
.query-form-wrapper {
  margin-bottom: 20px;
}
</style>
