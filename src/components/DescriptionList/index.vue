<template>
  <el-descriptions
    :column="column"
    :border="border"
    :label-width="labelWidth"
  >
    <el-descriptions-item
      v-for="item in items"
      :key="item.label"
      :label="item.label"
      :span="item.span || 1"
    >
      <template v-if="item.slot">
        <slot
          :name="item.slot"
          :value="data[item.field]"
          :row="data"
        />
      </template>
      <template v-else-if="item.formatter">
        {{ item.formatter(data[item.field], data) }}
      </template>
      <template v-else>
        {{ data[item.field] ?? '-' }}
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
interface DescriptionItem {
  label: string
  field: string
  span?: number
  slot?: string
  formatter?: (value: any, row: Record<string, any>) => string
}

interface Props {
  data: Record<string, any>
  items: DescriptionItem[]
  column?: number
  border?: boolean
  labelWidth?: string
}

withDefaults(defineProps<Props>(), {
  column: 2,
  border: true,
  labelWidth: '100px'
})
</script>
