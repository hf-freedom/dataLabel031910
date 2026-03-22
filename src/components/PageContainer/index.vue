<template>
  <div class="page-container">
    <el-card>
      <slot name="header" v-if="$slots.header"></slot>
      <slot name="query" v-if="$slots.query"></slot>
      <slot name="actions" v-if="$slots.actions"></slot>
      <slot></slot>
      <slot name="pagination" v-if="$slots.pagination"></slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.page-container {
  padding: 20px;
  min-height: calc(100vh - 60px);
}
</style>
