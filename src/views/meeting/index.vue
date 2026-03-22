<template>
  <div class="page-container">
    <el-card>
      <QueryForm :model="queryForm" @query="handleQuery" @reset="handleReset">
        <el-form-item label="会议主题">
          <el-input v-model="queryForm.title" placeholder="请输入会议主题" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryForm.status" placeholder="请选择状态" clearable>
            <el-option label="全部" value="" />
            <el-option label="已预约" :value="MeetingStatus.SCHEDULED" />
            <el-option label="进行中" :value="MeetingStatus.ONGOING" />
            <el-option label="已完成" :value="MeetingStatus.COMPLETED" />
            <el-option label="已取消" :value="MeetingStatus.CANCELLED" />
          </el-select>
        </el-form-item>
        <el-form-item label="会议时间">
          <el-date-picker
            v-model="queryForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </QueryForm>

      <TableActions>
        <el-button type="primary" @click="handleCreate">
          <el-icon><Plus /></el-icon>
          预约会议
        </el-button>
      </TableActions>

      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="会议主题" show-overflow-tooltip />
        <el-table-column prop="time" label="会议时间" width="180" />
        <el-table-column prop="location" label="地点" width="150" />
        <el-table-column prop="organizer" label="组织者" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <StatusTag
              :type="getMeetingStatus(row.status).type"
              :text="getMeetingStatus(row.status).text"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleDetail(row)">详情</el-button>
            <el-button type="primary" link @click="handleEdit(row)" v-if="row.status === MeetingStatus.SCHEDULED">编辑</el-button>
            <el-button type="primary" link @click="handleMinutes(row)" v-if="row.status === MeetingStatus.COMPLETED">纪要</el-button>
            <el-button type="danger" link @click="handleCancel(row)" v-if="row.status === MeetingStatus.SCHEDULED">取消</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-model:page="pagination.page"
        v-model:pageSize="pagination.pageSize"
        :total="pagination.total"
        @change="handlePageChange"
      />
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
        <el-form-item label="会议主题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入会议主题" />
        </el-form-item>

        <el-form-item label="会议时间" prop="time">
          <el-date-picker
            v-model="formData.time"
            type="datetime"
            placeholder="选择会议时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="会议地点" prop="location">
          <el-select v-model="formData.location" placeholder="请选择会议室">
            <el-option label="会议室A" value="会议室A" />
            <el-option label="会议室B" value="会议室B" />
            <el-option label="会议室C" value="会议室C" />
          </el-select>
        </el-form-item>

        <el-form-item label="参会人员" prop="attendees">
          <el-select v-model="formData.attendees" multiple placeholder="请选择参会人员">
            <el-option label="张三" value="张三" />
            <el-option label="李四" value="李四" />
            <el-option label="王五" value="王五" />
            <el-option label="赵六" value="赵六" />
          </el-select>
        </el-form-item>

        <el-form-item label="会议设备">
          <el-checkbox-group v-model="formData.equipment">
            <el-checkbox label="投影仪" />
            <el-checkbox label="白板" />
            <el-checkbox label="音响" />
            <el-checkbox label="视频会议" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="会议描述">
          <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入会议描述" />
        </el-form-item>

        <el-form-item label="会议资料">
          <el-upload
            v-model:file-list="fileList"
            action="#"
            :auto-upload="false"
            multiple
          >
            <el-button type="primary">上传资料</el-button>
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
      title="会议详情"
      width="800px"
    >
      <div class="meeting-detail" v-if="currentMeeting">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="会议主题" :span="2">{{ currentMeeting.title }}</el-descriptions-item>
          <el-descriptions-item label="会议时间">{{ currentMeeting.time }}</el-descriptions-item>
          <el-descriptions-item label="会议地点">{{ currentMeeting.location }}</el-descriptions-item>
          <el-descriptions-item label="组织者">{{ currentMeeting.organizer }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <StatusTag
              :type="getMeetingStatus(currentMeeting.status).type"
              :text="getMeetingStatus(currentMeeting.status).text"
            />
          </el-descriptions-item>
          <el-descriptions-item label="参会人员" :span="2">
            {{ currentMeeting.attendees.join('、') }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="mt-20" v-if="currentMeeting.minutes">
          <h3>会议纪要</h3>
          <div class="minutes-content">{{ currentMeeting.minutes }}</div>
        </div>

        <div class="mt-20" v-if="currentMeeting.materials?.length">
          <h3>会议资料</h3>
          <el-tag
            v-for="(file, index) in currentMeeting.materials"
            :key="index"
            class="mr-10"
          >
            {{ file }}
          </el-tag>
        </div>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="minutesVisible"
      title="会议纪要"
      width="700px"
    >
      <el-form :model="minutesForm" label-width="100px">
        <el-form-item label="会议纪要">
          <el-input v-model="minutesForm.content" type="textarea" :rows="8" placeholder="请输入会议纪要" />
        </el-form-item>
        <el-form-item label="待办事项">
          <el-input v-model="minutesForm.todos" type="textarea" :rows="4" placeholder="请输入待办事项，每行一项" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="minutesVisible = false">取消</el-button>
        <el-button type="primary" @click="handleMinutesSubmit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { QueryForm, TableActions, Pagination, StatusTag } from '@/components/common'
import { usePagination, useLoading, useStatusMapper } from '@/composables'
import { MeetingStatus } from '@/constants'
import { meetingApi } from '@/api'
import type { Meeting } from '@/types'
import type { MeetingFormData, MeetingQueryForm, MeetingMinutesForm } from '@/types/form'

const { pagination, resetPagination } = usePagination()
const { loading, startLoading, stopLoading } = useLoading()
const { getMeetingStatus } = useStatusMapper()

const dialogVisible = ref(false)
const detailVisible = ref(false)
const minutesVisible = ref(false)
const dialogTitle = ref('预约会议')
const formRef = ref<FormInstance>()
const fileList = ref<any[]>([])

const queryForm = reactive<MeetingQueryForm>({
  title: '',
  status: '',
  dateRange: []
})

const formData = reactive<MeetingFormData>({
  id: '',
  title: '',
  time: '',
  location: '',
  attendees: [],
  equipment: [],
  description: ''
})

const formRules: FormRules = {
  title: [{ required: true, message: '请输入会议主题', trigger: 'blur' }],
  time: [{ required: true, message: '请选择会议时间', trigger: 'change' }],
  location: [{ required: true, message: '请选择会议室', trigger: 'change' }],
  attendees: [{ required: true, message: '请选择参会人员', trigger: 'change' }]
}

const minutesForm = reactive<MeetingMinutesForm>({
  content: '',
  todos: ''
})

const tableData = ref<Meeting[]>([
  {
    id: '1',
    title: '项目进度汇报会议',
    time: '2024-03-25 14:00:00',
    location: '会议室A',
    roomId: 'A',
    attendees: ['张三', '李四', '王五'],
    organizer: '张三',
    status: MeetingStatus.SCHEDULED
  },
  {
    id: '2',
    title: '技术方案评审会议',
    time: '2024-03-26 10:00:00',
    location: '会议室B',
    roomId: 'B',
    attendees: ['李四', '赵六', '孙七'],
    organizer: '李四',
    status: MeetingStatus.SCHEDULED
  },
  {
    id: '3',
    title: '季度总结会议',
    time: '2024-03-20 15:00:00',
    location: '会议室C',
    roomId: 'C',
    attendees: ['张三', '李四', '王五', '赵六'],
    organizer: '张三',
    status: MeetingStatus.COMPLETED,
    minutes: '本次会议主要讨论了Q1的工作成果和Q2的工作计划。',
    materials: ['季度总结报告.pdf', '工作计划.xlsx']
  }
])

const currentMeeting = ref<Meeting | null>(null)

const handleQuery = () => {
  startLoading()
  setTimeout(() => {
    pagination.total = tableData.value.length
    stopLoading()
  }, 500)
}

const handleReset = () => {
  queryForm.title = ''
  queryForm.status = ''
  queryForm.dateRange = []
  resetPagination()
  handleQuery()
}

const handlePageChange = () => {
  handleQuery()
}

const handleCreate = () => {
  dialogTitle.value = '预约会议'
  dialogVisible.value = true
}

const handleEdit = (row: Meeting) => {
  dialogTitle.value = '编辑会议'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDetail = (row: Meeting) => {
  currentMeeting.value = row
  detailVisible.value = true
}

const handleMinutes = (row: Meeting) => {
  currentMeeting.value = row
  minutesForm.content = row.minutes || ''
  minutesVisible.value = true
}

const handleCancel = async (row: Meeting) => {
  try {
    await ElMessageBox.confirm('确定要取消该会议吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    row.status = MeetingStatus.CANCELLED
    ElMessage.success('会议已取消')
    handleQuery()
  } catch {
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success(dialogTitle.value === '预约会议' ? '预约成功' : '编辑成功')
      dialogVisible.value = false
      handleQuery()
    }
  })
}

const handleMinutesSubmit = () => {
  if (currentMeeting.value) {
    currentMeeting.value.minutes = minutesForm.content
  }
  minutesVisible.value = false
  ElMessage.success('会议纪要保存成功')
}

const handleDialogClose = () => {
  formRef.value?.resetFields()
  fileList.value = []
}

handleQuery()
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.mt-20 {
  margin-top: 20px;
}

.mr-10 {
  margin-right: 10px;
}

.meeting-detail {
  padding: 20px;
}

.minutes-content {
  line-height: 1.8;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
  min-height: 100px;
}
</style>
