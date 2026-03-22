<template>
  <div class="page-container">
    <el-card>
      <QueryForm
        v-model="queryForm"
        @query="handleQuery"
        @reset="handleReset"
      >
        <el-form-item label="标题">
          <el-input
            v-model="queryForm.title"
            placeholder="请输入标题"
            clearable
          />
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            v-model="queryForm.department"
            placeholder="请选择部门"
            clearable
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              v-for="dept in DEPARTMENTS"
              :key="dept"
              :label="dept"
              :value="dept"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="queryForm.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              v-for="(text, value) in ANNOUNCEMENT_STATUS_TEXT"
              :key="value"
              :label="text"
              :value="value"
            />
          </el-select>
        </el-form-item>
      </QueryForm>

      <TableActions>
        <el-button
          type="primary"
          @click="handleCreate"
        >
          <el-icon><Plus /></el-icon>
          发布公告
        </el-button>
      </TableActions>

      <el-table
        v-loading="loading"
        :data="tableData"
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
          width="120"
        />
        <el-table-column
          prop="department"
          label="部门"
          width="120"
        />
        <el-table-column
          prop="publishTime"
          label="发布时间"
          width="180"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template #default="{ row }">
            <StatusTag
              :status="row.status"
              :status-map="announcementStatusMap"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="readStatus"
          label="阅读状态"
          width="100"
        >
          <template #default="{ row }">
            <el-tag
              :type="row.readStatus ? 'success' : 'info'"
              size="small"
            >
              {{ row.readStatus ? '已读' : '未读' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              @click="handleView(row)"
            >
              查看
            </el-button>
            <el-button
              v-if="row.status === ANNOUNCEMENT_STATUS.DRAFT"
              type="primary"
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="row.status === ANNOUNCEMENT_STATUS.DRAFT"
              type="danger"
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button
              v-if="row.status === ANNOUNCEMENT_STATUS.PUBLISHED"
              type="warning"
              link
              @click="handleRecall(row)"
            >
              撤回
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-model:page="pagination.page"
        v-model:limit="pagination.pageSize"
        :total="pagination.total"
        @change="handleQuery"
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
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="formData.title"
            placeholder="请输入公告标题"
          />
        </el-form-item>

        <el-form-item
          label="发布范围"
          prop="scope"
        >
          <el-radio-group v-model="formData.scope">
            <el-radio
              v-for="(text, value) in ANNOUNCEMENT_SCOPE_TEXT"
              :key="value"
              :label="value"
            >
              {{ text }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="formData.scope === ANNOUNCEMENT_SCOPE.DEPARTMENT"
          label="选择部门"
        >
          <el-select
            v-model="formData.scopeData"
            multiple
            placeholder="请选择部门"
          >
            <el-option
              v-for="dept in DEPARTMENTS"
              :key="dept"
              :label="dept"
              :value="dept"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="formData.scope === ANNOUNCEMENT_SCOPE.SPECIFIC"
          label="选择人员"
        >
          <el-select
            v-model="formData.scopeData"
            multiple
            placeholder="请选择人员"
          >
            <el-option
              v-for="emp in EMPLOYEES"
              :key="emp"
              :label="emp"
              :value="emp"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="生效时间"
          prop="effectiveTime"
        >
          <el-date-picker
            v-model="formData.effectiveTime"
            type="datetime"
            placeholder="选择生效时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item
          label="失效时间"
          prop="expireTime"
        >
          <el-date-picker
            v-model="formData.expireTime"
            type="datetime"
            placeholder="选择失效时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item
          label="内容"
          prop="content"
        >
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
            <el-button type="primary">
              上传附件
            </el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >
          发布
        </el-button>
        <el-button @click="handleSaveDraft">
          保存草稿
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detailVisible"
      title="公告详情"
      width="800px"
    >
      <div
        v-if="currentAnnouncement"
        class="announcement-detail"
      >
        <h2>{{ currentAnnouncement.title }}</h2>
        <div class="detail-info">
          <span>发布人：{{ currentAnnouncement.publisher }}</span>
          <span>部门：{{ currentAnnouncement.department }}</span>
          <span>发布时间：{{ currentAnnouncement.publishTime }}</span>
        </div>
        <div class="detail-content">
          {{ currentAnnouncement.content }}
        </div>
        <div
          v-if="currentAnnouncement.attachments?.length"
          class="detail-attachments"
        >
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
        <el-button @click="detailVisible = false">
          关闭
        </el-button>
        <el-button
          type="primary"
          @click="handleMarkRead"
        >
          标记已读
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { QueryForm, TableActions, Pagination, StatusTag } from '@/components'
import { usePagination, useQueryForm, useLoading, useMessage, useConfirm } from '@/composables'
import {
  ANNOUNCEMENT_STATUS,
  ANNOUNCEMENT_STATUS_TEXT,
  ANNOUNCEMENT_STATUS_TYPE,
  ANNOUNCEMENT_SCOPE,
  ANNOUNCEMENT_SCOPE_TEXT,
  DEPARTMENTS,
  EMPLOYEES
} from '@/constants'
import type { Announcement, AnnouncementQueryForm, AnnouncementFormData } from '@/types'

const { pagination, handleSizeChange, handleCurrentChange, setTotal } = usePagination()
const { queryForm, resetQueryForm } = useQueryForm<AnnouncementQueryForm>({
  title: '',
  department: '',
  status: ''
})
const { loading, withLoading } = useLoading()
const { success } = useMessage()
const { confirm, confirmDelete } = useConfirm()

const dialogVisible = ref(false)
const detailVisible = ref(false)
const dialogTitle = ref('发布公告')
const formRef = ref<FormInstance>()
const fileList = ref<any[]>([])
const currentAnnouncement = ref<Announcement | null>(null)

const formData = reactive<AnnouncementFormData>({
  id: '',
  title: '',
  content: '',
  scope: ANNOUNCEMENT_SCOPE.ALL,
  scopeData: [],
  effectiveTime: '',
  expireTime: '',
  status: ANNOUNCEMENT_STATUS.DRAFT
})

const formRules: FormRules = {
  title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
  effectiveTime: [{ required: true, message: '请选择生效时间', trigger: 'change' }],
  expireTime: [{ required: true, message: '请选择失效时间', trigger: 'change' }]
}

const announcementStatusMap = computed(() => {
  const map: Record<string, { text: string; type: string }> = {}
  Object.keys(ANNOUNCEMENT_STATUS_TEXT).forEach(key => {
    map[key] = {
      text: ANNOUNCEMENT_STATUS_TEXT[key],
      type: ANNOUNCEMENT_STATUS_TYPE[key]
    }
  })
  return map
})

const tableData = ref<Announcement[]>([
  {
    id: '1',
    title: '关于清明节放假安排的通知',
    content: '根据国家法定节假日安排，公司将于4月4日至4月6日放假，共3天。',
    scope: ANNOUNCEMENT_SCOPE.ALL,
    publishTime: '2024-03-20 10:00:00',
    effectiveTime: '2024-03-20 10:00:00',
    expireTime: '2024-04-10 10:00:00',
    status: ANNOUNCEMENT_STATUS.PUBLISHED,
    publisher: '行政部',
    department: '行政部',
    readStatus: true
  },
  {
    id: '2',
    title: '公司系统升级维护公告',
    content: '为了提升系统性能，公司将于3月25日进行系统升级维护。',
    scope: ANNOUNCEMENT_SCOPE.ALL,
    publishTime: '2024-03-19 15:00:00',
    effectiveTime: '2024-03-19 15:00:00',
    expireTime: '2024-03-30 15:00:00',
    status: ANNOUNCEMENT_STATUS.PUBLISHED,
    publisher: '技术部',
    department: '技术部',
    readStatus: false
  },
  {
    id: '3',
    title: '2024年度优秀员工评选通知',
    content: '为表彰先进，树立典型，公司决定开展2024年度优秀员工评选活动。',
    scope: ANNOUNCEMENT_SCOPE.DEPARTMENT,
    scopeData: ['技术部', '行政部'],
    publishTime: '2024-03-18 09:00:00',
    effectiveTime: '2024-03-18 09:00:00',
    expireTime: '2024-04-01 09:00:00',
    status: ANNOUNCEMENT_STATUS.PUBLISHED,
    publisher: '人力资源部',
    department: '人力资源部',
    readStatus: true
  }
])

const handleQuery = () => {
  withLoading(async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    setTotal(tableData.value.length)
  })
}

const handleReset = () => {
  resetQueryForm(handleQuery)
}

const handleCreate = () => {
  dialogTitle.value = '发布公告'
  Object.assign(formData, {
    id: '',
    title: '',
    content: '',
    scope: ANNOUNCEMENT_SCOPE.ALL,
    scopeData: [],
    effectiveTime: '',
    expireTime: '',
    status: ANNOUNCEMENT_STATUS.DRAFT
  })
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
  const confirmed = await confirmDelete('该公告')
  if (confirmed) {
    const index = tableData.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      tableData.value.splice(index, 1)
    }
    success('删除成功')
  }
}

const handleRecall = async (row: Announcement) => {
  const confirmed = await confirm('确定要撤回该公告吗？')
  if (confirmed) {
    row.status = ANNOUNCEMENT_STATUS.DRAFT
    success('撤回成功')
  }
}

const handleMarkRead = () => {
  if (currentAnnouncement.value) {
    currentAnnouncement.value.readStatus = true
  }
  detailVisible.value = false
  success('已标记为已读')
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      success('发布成功')
      dialogVisible.value = false
      handleReset()
    }
  })
}

const handleSaveDraft = () => {
  success('草稿保存成功')
  dialogVisible.value = false
}

const handleDialogClose = () => {
  formRef.value?.resetFields()
  fileList.value = []
}

handleQuery()
</script>

<style scoped lang="scss">
.announcement-detail {
  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  .detail-info {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;

    span {
      margin-right: 30px;
    }
  }

  .detail-content {
    padding: 20px;
    background: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 20px;
    line-height: 1.8;
    color: #333;
  }

  .detail-attachments {
    h4 {
      margin-bottom: 10px;
      color: #333;
    }
  }
}
</style>
