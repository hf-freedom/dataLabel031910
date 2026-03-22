<template>
  <div class="page-container">
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in statistics"
        :key="index"
        :span="6"
      >
        <el-card class="stat-card">
          <div class="stat-content">
            <div
              class="stat-icon"
              :style="{ background: item.color }"
            >
              <el-icon
                :size="32"
                color="#fff"
              >
                <component :is="item.icon" />
              </el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">
                {{ item.value }}
              </div>
              <div class="stat-label">
                {{ item.label }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      class="mt-20"
    >
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
              <el-button
                type="primary"
                link
              >
                查看全部
              </el-button>
            </div>
          </template>
          <el-table
            :data="todoList"
            style="width: 100%"
          >
            <el-table-column
              prop="title"
              label="事项"
            />
            <el-table-column
              prop="type"
              label="类型"
              width="100"
            >
              <template #default="{ row }">
                <el-tag
                  :type="row.type === 'urgent' ? 'danger' : 'primary'"
                  size="small"
                >
                  {{ row.type === 'urgent' ? '紧急' : '普通' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="时间"
              width="180"
            />
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最新公告</span>
              <el-button
                type="primary"
                link
              >
                查看全部
              </el-button>
            </div>
          </template>
          <el-table
            :data="announcementList"
            style="width: 100%"
          >
            <el-table-column
              prop="title"
              label="标题"
              show-overflow-tooltip
            />
            <el-table-column
              prop="publisher"
              label="发布人"
              width="100"
            />
            <el-table-column
              prop="time"
              label="时间"
              width="180"
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      class="mt-20"
    >
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>快捷入口</span>
            </div>
          </template>
          <div class="quick-actions">
            <div
              v-for="action in quickActions"
              :key="action.id"
              class="action-item"
              @click="handleQuickAction(action.path)"
            >
              <el-icon
                :size="40"
                :color="action.color"
              >
                <component :is="action.icon" />
              </el-icon>
              <span>{{ action.label }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const statistics = [
  { label: '待审批', value: 12, icon: 'DocumentCopy', color: '#409eff' },
  { label: '待办任务', value: 8, icon: 'List', color: '#67c23a' },
  { label: '今日会议', value: 3, icon: 'Calendar', color: '#e6a23c' },
  { label: '未读公告', value: 5, icon: 'Bell', color: '#f56c6c' }
]

const todoList = [
  { title: '请假申请审批 - 张三', type: 'urgent', time: '2024-03-22 09:00' },
  { title: '报销申请审批 - 李四', type: 'normal', time: '2024-03-22 10:30' },
  { title: '用印申请审批 - 王五', type: 'normal', time: '2024-03-22 14:00' },
  { title: '车辆申请审批 - 赵六', type: 'urgent', time: '2024-03-22 15:30' }
]

const announcementList = [
  { title: '关于清明节放假安排的通知', publisher: '行政部', time: '2024-03-20 10:00' },
  { title: '公司系统升级维护公告', publisher: '技术部', time: '2024-03-19 15:00' },
  { title: '2024年度优秀员工评选通知', publisher: '人力资源部', time: '2024-03-18 09:00' },
  { title: '关于办公环境整改的通知', publisher: '行政部', time: '2024-03-17 14:00' }
]

const quickActions = [
  { id: '1', label: '发布公告', icon: 'Bell', color: '#409eff', path: '/announcement' },
  { id: '2', label: '上传文档', icon: 'Document', color: '#67c23a', path: '/document' },
  { id: '3', label: '发起审批', icon: 'DocumentCopy', color: '#e6a23c', path: '/approval' },
  { id: '4', label: '预约会议', icon: 'Calendar', color: '#f56c6c', path: '/meeting' },
  { id: '5', label: '申请用车', icon: 'Van', color: '#909399', path: '/vehicle' },
  { id: '6', label: '创建任务', icon: 'List', color: '#606266', path: '/task' }
]

const handleQuickAction = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="scss">
.stat-card {
  .stat-content {
    display: flex;
    align-items: center;

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }

    .stat-info {
      flex: 1;

      .stat-value {
        font-size: 28px;
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 14px;
        color: #999;
      }
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;

  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #f5f5f5;
    }

    span {
      margin-top: 10px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>