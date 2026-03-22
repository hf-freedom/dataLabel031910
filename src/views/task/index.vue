<template>
  <div class="page-container">
    <el-card>
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="我的任务" name="my">
          <el-form :inline="true" :model="queryForm" class="query-form">
            <el-form-item label="任务名称">
              <el-input v-model="queryForm.title" placeholder="请输入任务名称" clearable />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="queryForm.status" placeholder="请选择状态" clearable>
                <el-option label="全部" value="" />
                <el-option label="未开始" value="not_started" />
                <el-option label="进行中" value="in_progress" />
                <el-option label="已完成" value="completed" />
              </el-select>
            </el-form-item>
            <el-form-item label="优先级">
              <el-select v-model="queryForm.priority" placeholder="请选择优先级" clearable>
                <el-option label="全部" value="" />
                <el-option label="高" value="high" />
                <el-option label="中" value="medium" />
                <el-option label="低" value="low" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleQuery">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>

          <el-table :data="myTaskList" style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="任务名称" show-overflow-tooltip />
            <el-table-column prop="creator" label="创建人" width="100" />
            <el-table-column prop="createTime" label="创建时间" width="180" />
            <el-table-column prop="deadline" label="截止时间" width="180" />
            <el-table-column prop="priority" label="优先级" width="100">
              <template #default="{ row }">
                <el-tag :type="getPriorityType(row.priority)" size="small">
                  {{ getPriorityText(row.priority) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small">
                  {{ getStatusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleDetail(row)">详情</el-button>
                <el-button type="primary" link @click="handleUpdateStatus(row)">更新进度</el-button>
                <el-button type="primary" link @click="handleRemind(row)" v-if="row.status !== 'completed'">催办</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="mt-20"
          />
        </el-tab-pane>

        <el-tab-pane label="我创建的" name="created">
          <div class="table-actions">
            <el-button type="primary" @click="handleCreate">
              <el-icon><Plus /></el-icon>
              创建任务
            </el-button>
          </div>
          <el-table :data="createdTaskList" style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="任务名称" show-overflow-tooltip />
            <el-table-column prop="assignee" label="执行人" width="100" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="180" />
            <el-table-column prop="deadline" label="截止时间" width="180" />
            <el-table-column prop="priority" label="优先级" width="100">
              <template #default="{ row }">
                <el-tag :type="getPriorityType(row.priority)" size="small">
                  {{ getPriorityText(row.priority) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small">
                  {{ getStatusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleDetail(row)">详情</el-button>
                <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
                <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="mt-20"
          />
        </el-tab-pane>

        <el-tab-pane label="任务统计" name="statistics">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon" style="background: #409eff">
                    <el-icon :size="32" color="#fff"><List /></el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">{{ statistics.total }}</div>
                    <div class="stat-label">总任务数</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon" style="background: #67c23a">
                    <el-icon :size="32" color="#fff"><CircleCheck /></el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">{{ statistics.completed }}</div>
                    <div class="stat-label">已完成</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon" style="background: #e6a23c">
                    <el-icon :size="32" color="#fff"><Clock /></el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">{{ statistics.inProgress }}</div>
                    <div class="stat-label">进行中</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon" style="background: #f56c6c">
                    <el-icon :size="32" color="#fff"><Warning /></el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">{{ statistics.overdue }}</div>
                    <div class="stat-label">已逾期</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="mt-20">
            <el-col :span="12">
              <el-card>
                <template #header>
                  <div class="card-header">
                    <span>部门任务完成率</span>
                  </div>
                </template>
                <div class="chart-placeholder">
                  <el-empty description="图表区域" />
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card>
                <template #header>
                  <div class="card-header">
                    <span>员工任务完成率</span>
                  </div>
                </template>
                <div class="chart-placeholder">
                  <el-empty description="图表区域" />
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="700px"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="任务名称" prop="title">
          <el-input v-model="formData.title" placeholder="请输入任务名称" />
        </el-form-item>

        <el-form-item label="任务描述" prop="description">
          <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入任务描述" />
        </el-form-item>

        <el-form-item label="执行人" prop="assignee">
          <el-select v-model="formData.assignee" placeholder="请选择执行人">
            <el-option label="张三" value="张三" />
            <el-option label="李四" value="李四" />
            <el-option label="王五" value="王五" />
          </el-select>
        </el-form-item>

        <el-form-item label="抄送人">
          <el-select v-model="formData.cc" multiple placeholder="请选择抄送人">
            <el-option label="张三" value="张三" />
            <el-option label="李四" value="李四" />
            <el-option label="王五" value="王五" />
          </el-select>
        </el-form-item>

        <el-form-item label="截止时间" prop="deadline">
          <el-date-picker
            v-model="formData.deadline"
            type="datetime"
            placeholder="选择截止时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="优先级" prop="priority">
          <el-radio-group v-model="formData.priority">
            <el-radio label="high">高</el-radio>
            <el-radio label="medium">中</el-radio>
            <el-radio label="low">低</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="附件">
          <el-upload
            v-model:file-list="fileList"
            action="#"
            :auto-upload="false"
            multiple
          >
            <el-button type="primary">上传附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detailVisible"
      title="任务详情"
      width="800px"
    >
      <div class="task-detail" v-if="currentTask">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="任务名称" :span="2">{{ currentTask.title }}</el-descriptions-item>
          <el-descriptions-item label="创建人">{{ currentTask.creator }}</el-descriptions-item>
          <el-descriptions-item label="执行人">{{ currentTask.assignee }}</el-descriptions-item>
          <el-descriptions-item label="部门">{{ currentTask.department }}</el-descriptions-item>
          <el-descriptions-item label="优先级">
            <el-tag :type="getPriorityType(currentTask.priority)">
              {{ getPriorityText(currentTask.priority) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ currentTask.createTime }}</el-descriptions-item>
          <el-descriptions-item label="截止时间">{{ currentTask.deadline }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getStatusType(currentTask.status)">
              {{ getStatusText(currentTask.status) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="任务描述" :span="2">{{ currentTask.description }}</el-descriptions-item>
        </el-descriptions>

        <h3 class="mt-20">任务日志</h3>
        <el-timeline>
          <el-timeline-item
            v-for="(log, index) in currentTask.logs"
            :key="index"
            :timestamp="log.time"
          >
            <h4>{{ log.author }}</h4>
            <p>{{ log.content }}</p>
            <div v-if="log.attachments?.length">
              <el-tag
                v-for="(file, idx) in log.attachments"
                :key="idx"
                class="mr-10"
              >
                {{ file }}
              </el-tag>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleAddLog">添加日志</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="statusVisible"
      title="更新任务状态"
      width="500px"
    >
      <el-form :model="statusForm" label-width="100px">
        <el-form-item label="任务状态">
          <el-select v-model="statusForm.status" placeholder="请选择状态">
            <el-option label="未开始" value="not_started" />
            <el-option label="进行中" value="in_progress" />
            <el-option label="已完成" value="completed" />
          </el-select>
        </el-form-item>
        <el-form-item label="进度说明">
          <el-input v-model="statusForm.content" type="textarea" :rows="3" placeholder="请输入进度说明" />
        </el-form-item>
        <el-form-item label="成果附件">
          <el-upload
            v-model:file-list="logFileList"
            action="#"
            :auto-upload="false"
            multiple
          >
            <el-button type="primary">上传附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="statusVisible = false">取消</el-button>
        <el-button type="primary" @click="handleStatusSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import type { Task } from '@/types'

const activeTab = ref('my')
const loading = ref(false)
const dialogVisible = ref(false)
const detailVisible = ref(false)
const statusVisible = ref(false)
const dialogTitle = ref('创建任务')
const formRef = ref<FormInstance>()
const fileList = ref<any[]>([])
const logFileList = ref<any[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const queryForm = reactive({
  title: '',
  status: '',
  priority: ''
})

const formData = reactive({
  id: '',
  title: '',
  description: '',
  assignee: '',
  cc: [] as string[],
  deadline: '',
  priority: 'medium'
})

const formRules: FormRules = {
  title: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入任务描述', trigger: 'blur' }],
  assignee: [{ required: true, message: '请选择执行人', trigger: 'change' }],
  deadline: [{ required: true, message: '请选择截止时间', trigger: 'change' }]
}

const statusForm = reactive({
  status: '',
  content: ''
})

const statistics = reactive({
  total: 15,
  completed: 8,
  inProgress: 5,
  overdue: 2
})

const myTaskList = ref<Task[]>([
  {
    id: '1',
    title: '完成前端页面开发',
    description: '完成用户管理模块的前端页面开发',
    assignee: '张三',
    department: '技术部',
    creator: '李四',
    createTime: '2024-03-20 10:00:00',
    deadline: '2024-03-25 18:00:00',
    priority: 'high',
    status: 'in_progress',
    logs: [
      { content: '任务已创建', time: '2024-03-20 10:00:00', author: '李四' },
      { content: '开始开发', time: '2024-03-21 09:00:00', author: '张三' }
    ]
  },
  {
    id: '2',
    title: '编写测试用例',
    description: '为用户管理模块编写测试用例',
    assignee: '张三',
    department: '技术部',
    creator: '王五',
    createTime: '2024-03-21 14:00:00',
    deadline: '2024-03-26 18:00:00',
    priority: 'medium',
    status: 'not_started',
    logs: [
      { content: '任务已创建', time: '2024-03-21 14:00:00', author: '王五' }
    ]
  }
])

const createdTaskList = ref<Task[]>([
  {
    id: '3',
    title: '完成API接口开发',
    description: '完成用户管理模块的API接口开发',
    assignee: '李四',
    department: '技术部',
    creator: '张三',
    createTime: '2024-03-19 09:00:00',
    deadline: '2024-03-22 18:00:00',
    priority: 'high',
    status: 'completed',
    logs: [
      { content: '任务已创建', time: '2024-03-19 09:00:00', author: '张三' },
      { content: '已完成接口开发', time: '2024-03-21 16:00:00', author: '李四' }
    ]
  }
])

const currentTask = ref<Task | null>(null)

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    not_started: '未开始',
    in_progress: '进行中',
    completed: '已完成'
  }
  return map[status] || '未知'
}

const getStatusType = (status: string) => {
  const map: Record<string, any> = {
    not_started: 'info',
    in_progress: 'warning',
    completed: 'success'
  }
  return map[status] || 'info'
}

const getPriorityText = (priority: string) => {
  const map: Record<string, string> = {
    high: '高',
    medium: '中',
    low: '低'
  }
  return map[priority] || '未知'
}

const getPriorityType = (priority: string) => {
  const map: Record<string, any> = {
    high: 'danger',
    medium: 'warning',
    low: 'info'
  }
  return map[priority] || 'info'
}

const handleTabChange = (tab: string) => {
  activeTab.value = tab
  handleQuery()
}

const handleQuery = () => {
  loading.value = true
  setTimeout(() => {
    if (activeTab.value === 'my') {
      pagination.total = myTaskList.value.length
    } else if (activeTab.value === 'created') {
      pagination.total = createdTaskList.value.length
    } else {
      pagination.total = 0
    }
    loading.value = false
  }, 500)
}

const handleReset = () => {
  queryForm.title = ''
  queryForm.status = ''
  queryForm.priority = ''
  handleQuery()
}

const handleCreate = () => {
  dialogTitle.value = '创建任务'
  dialogVisible.value = true
}

const handleEdit = (row: Task) => {
  dialogTitle.value = '编辑任务'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDetail = (row: Task) => {
  currentTask.value = row
  detailVisible.value = true
}

const handleUpdateStatus = (row: Task) => {
  currentTask.value = row
  statusForm.status = row.status
  statusForm.content = ''
  statusVisible.value = true
}

const handleRemind = (row: Task) => {
  ElMessage.success(`已向${row.assignee}发送催办提醒`)
}

const handleDelete = async (row: Task) => {
  try {
    await ElMessageBox.confirm('确定要删除该任务吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const index = createdTaskList.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      createdTaskList.value.splice(index, 1)
    }
    ElMessage.success('删除成功')
    handleQuery()
  } catch {
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success(dialogTitle.value === '创建任务' ? '创建成功' : '编辑成功')
      dialogVisible.value = false
      handleQuery()
    }
  })
}

const handleAddLog = () => {
  ElMessage.info('添加日志功能开发中')
}

const handleStatusSubmit = () => {
  if (currentTask.value) {
    currentTask.value.status = statusForm.status as any
    currentTask.value.logs.push({
      content: statusForm.content,
      time: new Date().toLocaleString(),
      author: '张三'
    })
  }
  statusVisible.value = false
  ElMessage.success('状态更新成功')
  handleQuery()
}

const handleDialogClose = () => {
  formRef.value?.resetFields()
  fileList.value = []
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  handleQuery()
}

const handleCurrentChange = (page: number) => {
  pagination.page = page
  handleQuery()
}

handleQuery()
</script>

<style scoped lang="scss">
.query-form {
  margin-bottom: 20px;
}

.table-actions {
  margin-bottom: 20px;
}

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

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-detail {
  h3 {
    margin: 20px 0 10px;
    color: #333;
  }
}
</style>