<template>
  <div class="table-actions">
    <el-button v-for="action in actions" :key="action.label" :type="action.type" @click="handleAction(action)">
      <el-icon v-if="action.icon" :size="16">
        <component :is="action.icon" />
      </el-icon>
      {{ action.label }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import type { TableAction } from '../index'

defineProps<{
  actions: TableAction[]
}>()

const handleAction = (action: TableAction) => {
  action.handler?.()
}
</script>

<style scoped lang="scss">
.table-actions {
  margin-bottom: 20px;
}
</style>
