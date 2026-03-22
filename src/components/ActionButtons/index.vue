<template>
  <div class="action-buttons">
    <template v-for="(btn, index) in buttons" :key="index">
      <el-button
        :type="btn.type"
        link
        :disabled="btn.disabled"
        @click="handleClick(btn)"
      >
        {{ btn.label }}
      </el-button>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ActionButton } from '../index'

defineProps<{
  buttons: ActionButton[]
}>()

const emit = defineEmits<{
  (e: 'click', btn: ActionButton): void
}>()

const handleClick = (btn: ActionButton) => {
  if (btn.disabled) return
  emit('click', btn)
  btn.action?.()
}
</script>

<style scoped lang="scss">
.action-buttons {
  display: flex;
  gap: 8px;
}
</style>
