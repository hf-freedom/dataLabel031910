<template>
  <el-card class="stat-card">
    <div class="stat-content">
      <div
        class="stat-icon"
        :style="{ background: iconBg }"
      >
        <el-icon
          :size="32"
          color="#fff"
        >
          <component :is="icon" />
        </el-icon>
      </div>
      <div class="stat-info">
        <div class="stat-value">
          {{ value }}
          <span
            v-if="suffix"
            class="stat-suffix"
          >{{ suffix }}</span>
        </div>
        <div class="stat-label">
          {{ label }}
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { type Component } from 'vue'

interface Props {
  icon: Component
  iconBg?: string
  value: string | number
  label: string
  suffix?: string
}

withDefaults(defineProps<Props>(), {
  iconBg: '#409eff'
})
</script>

<style scoped lang="scss">
.stat-card {
  .stat-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .stat-icon {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-info {
    flex: 1;
  }

  .stat-value {
    font-size: 28px;
    font-weight: bold;
    color: #333;
  }

  .stat-suffix {
    font-size: 14px;
    font-weight: normal;
    color: #666;
  }

  .stat-label {
    font-size: 14px;
    color: #999;
    margin-top: 4px;
  }
}
</style>
