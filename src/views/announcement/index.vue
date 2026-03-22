<template>
  <div class="page-container">
    <el-card>
      <QueryForm :model="queryForm" @query="handleQuery" @reset="handleReset">
        <el-form-item label="标题">
          <el-input v-model="queryForm.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="queryForm.department" placeholder="请选择部门" clearable>
            <el-option label="全部" value="" />
            <el-option
              v-for="dept in Departments"
              :key="dept.value"
              :label="dept.label"
              :value="dept.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryForm.status" placeholder="请选择状态" clearable>
            <el-option label="全部" value="" />
            <el-option label="已发布" :value="AnnouncementStatus.PUBLISHED" />
            <el-option label="草稿" :value="AnnouncementStatus.DRAFT" />
            <el-option label="已过期" :value="AnnouncementStatus.EXPIRED" />
          </el-select>
        </el-form-item>
      </QueryForm>

      <TableActions>
        <el-button type="primary" @click="handleCreate">
          <el-icon><Plus /></el-icon>
          发布公告
        </el-button>
      </TableActions>

      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="标题" show-overflow-tooltip />
        <el-table-column prop="publisher" label="发布人" width="120" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="publishTime" label="发布时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <StatusTag
              :type="getAnnouncementStatus(row.status).type"
              :text="getAnnouncementStatus(row.status).text"
            />
          </template>
        </el-table-column>
        <el-table-column prop="readStatus" label="阅读状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.readStatus ? 'success' : 'info'" size="small">
              {{ row.readStatus ? '已读' : '未读' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="primary" link @click="handleEdit(row)" v-if="row.status === AnnouncementStatus.DRAFT">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)" v-if="row.status === AnnouncementStatus.DRAFT">删除</el-button>
            <el-button type="warning" link @click="handleRecall(row)" v-if="row.status === AnnouncementStatus.PUBLISHED">撤回</el-button>
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
      width="800px"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入公告标题" />
        </el-form-item>

        <el-form-item label="发布范围" prop="scope">
          <el-radio-group v-model="formData.scope">
            <el-radio label="all">全员</el-radio>
            <el-radio label="department">部门</el-radio>
            <el-radio label="specific">指定人员</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择部门" v-if="formData.scope === 'department'">
          <el-select v-model="formData.scopeData" multiple placeholder="请选择部门">
            <el-option
              v-for="dept in Departments"
              :key="dept.value"
              :label="dept.label"
              :value="dept.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="选择人员" v-if="formData.scope === 'specific'">
          <el-select v-model="formData.scopeData" multiple placeholder="请选择人员">
            <el-option label="张三" value="张三" />
            <el-option label="李四" value="李四" />
            <el-option label="王五" value="王五" />
          </el-select>
        </el-form-item>

        <el-form-item label="生效时间" prop="effectiveTime">
          <el-date-picker
            v-model="formData.effectiveTime"
            type="datetime"
            placeholder="选择生效时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="失效时间" prop="expireTime">
          <el-date-picker
            v-model="formData.expireTime"
            type="datetime"
            placeholder="选择失效时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input
            v-model="formData.content"
            type="textarea"
            :rows="8"
            placeholder="请输入公告内容"
          />
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
        <el-button type="primary" @click="handleSubmit">发布</el-button>
        <el-button @click="handleSaveDraft">保存草稿</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detailVisible"
      title="公告详情"
      width="800px"
    >
      <div class="announcement-detail" v-if="currentAnnouncement">
        <h2>{{ currentAnnouncement.title }}</h2>
        <div class="detail-info">
          <span>发布人：{{ currentAnnouncement.publisher }}</span>
          <span>部门：{{ currentAnnouncement.department }}</span>
          <span>发布时间：{{ currentAnnouncement.publishTime }}</span>
        </div>
        <div class="detail-content">
          {{ currentAnnouncement.content }}
        </div>
        <div class="detail-attachments" v-if="currentAnnouncement.attachments?.length">
          <h4>附件：</h4>
          <el-tag
            v-for="(file, index) in currentAnnouncement.attachments"
            :key="index"
            class="mr-10"
          >
            {{ file }}
          </el-tag>
        </div>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleMarkRead">标记已读</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { QueryForm, TableActions, Pagination, StatusTag } from '@/components/common'
import { usePagination, useLoading, useStatusMapper } from '@/composables'
import { AnnouncementStatus, Departments } from '@/constants'
import { announcementApi } from '@/api'
import type { Announcement } from '@/types'
import type { AnnouncementFormData, AnnouncementQueryForm } from '@/types/form'

const { pagination, resetPagination } = usePagination()
const { loading, startLoading, stopLoading } = useLoading()
const { getAnnouncementStatus } = useStatusMapper()

const dialogVisible = ref(false)
const detailVisible = ref(false)
const dialogTitle = ref('发布公告')
const formRef = ref<FormInstance>()
const fileList = ref<any[]>([])

const queryForm = reactive<AnnouncementQueryForm>({
  title: '',
  department: '',
  status: ''
})

const formData = reactive<AnnouncementFormData>({
  id: '',
  title: '',
  content: '',
  scope: 'all',
  scopeData: [],
  effectiveTime: '',
  expireTime: '',
  status: AnnouncementStatus.DRAFT
})

const formRules: FormRules = {
  title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
  effectiveTime: [{ required: true, message: '请选择生效时间', trigger: 'change' }],
  expireTime: [{ required: true, message: '请选择失效时间', trigger: 'change' }]
}

const tableData = ref<Announcement[]>([
  {
    id: '1',
    title: '关于清明节放假安排的通知',
    content: '根据国家法定节假日安排，公司将于4月4日至4月6日放假，共3天。',
    scope: 'all',
    publishTime: '2024-03-20 10:00:00',
    effectiveTime: '2024-03-20 10:00:00',
    expireTime: '2024-04-10 10:00:00',
    status: AnnouncementStatus.PUBLISHED,
    publisher: '行政部',
    department: '行政部',
    readStatus: true
  },
  {
    id: '2',
    title: '公司系统升级维护公告',
    content: '为了提升系统性能，公司将于3月25日进行系统升级维护。',
    scope: 'all',
    publishTime: '2024-03-19 15:00:00',
    effectiveTime: '2024-03-19 15:00:00',
    expireTime: '2024-03-30 15:00:00',
    status: AnnouncementStatus.PUBLISHED,
    publisher: '技术部',
    department: '技术部',
    readStatus: false
  },
  {
    id: '3',
    title: '2024年度优秀员工评选通知',
    content: '为表彰先进，树立典型，公司决定开展2024年度优秀员工评选活动。',
    scope: 'department',
    scopeData: ['技术部', '行政部'],
    publishTime: '2024-03-18 09:00:00',
    effectiveTime: '2024-03-18 09:00:00',
    expireTime: '2024-04-01 09:00:00',
    status: AnnouncementStatus.PUBLISHED,
    publisher: '人力资源部',
    department: '人力资源部',
    readStatus: true
  }
])

const currentAnnouncement = ref<Announcement | null>(null)

const handleQuery = () => {
  startLoading()
  setTimeout(() => {
    pagination.total = 3
    stopLoading()
  }, 500)
}

const handleReset = () => {
  queryForm.title = ''
  queryForm.department = ''
  queryForm.status = ''
  resetPagination()
  handleQuery()
}

const handlePageChange = () => {
  handleQuery()
}

const handleCreate = () => {
  dialogTitle.value = '发布公告'
  dialogVisible.value = true
}

const handleEdit = (row: Announcement) => {
  dialogTitle.value = '编辑公告'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleView = (row: Announcement) => {
  currentAnnouncement.value = row
  detailVisible.value = true
}

const handleDelete = async (row: Announcement) => {
  try {
    await ElMessageBox.confirm('确定要删除该公告吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const index = tableData.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      tableData.value.splice(index, 1)
    }
    ElMessage.success('删除成功')
  } catch {
  }
}

const handleRecall = async (row: Announcement) => {
  try {
    await ElMessageBox.confirm('确定要撤回该公告吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    row.status = AnnouncementStatus.DRAFT
    ElMessage.success('撤回成功')
  } catch {
  }
}

const handleMarkRead = () => {
  if (currentAnnouncement.value) {
    currentAnnouncement.value.readStatus = true
  }
  detailVisible.value = false
  ElMessage.success('已标记为已读')
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('发布成功')
      dialogVisible.value = false
      handleReset()
    }
  })
}

const handleSaveDraft = () => {
  ElMessage.success('草稿保存成功')
  dialogVisible.value = false
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

.announcement-detail {
  padding: 20px;
}

.announcement-detail h2 {
  margin-bottom: 20px;
  text-align: center;
}

.detail-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}

.detail-content {
  line-height: 1.8;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
  min-height: 200px;
}

.detail-attachments {
  margin-top: 20px;
}
</style>
