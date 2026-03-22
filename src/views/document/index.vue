<template>
  <div class="page-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card class="folder-tree">
          <template #header>
            <div class="card-header">
              <span>文档分类</span>
              <el-button type="primary" link @click="handleAddFolder">
                <el-icon><Plus /></el-icon>
              </el-button>
            </div>
          </template>
          <el-tree
            :data="folderData"
            :props="{ label: 'name', children: 'children' }"
            node-key="id"
            default-expand-all
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <el-icon><Folder /></el-icon>
                <span class="ml-10">{{ node.label }}</span>
              </span>
            </template>
          </el-tree>
        </el-card>
      </el-col>

      <el-col :span="20">
        <el-card>
          <el-form :inline="true" :model="queryForm" class="query-form">
            <el-form-item label="文件名">
              <el-input v-model="queryForm.name" placeholder="请输入文件名" clearable />
            </el-form-item>
            <el-form-item label="上传人">
              <el-input v-model="queryForm.uploader" placeholder="请输入上传人" clearable />
            </el-form-item>
            <el-form-item label="上传时间">
              <el-date-picker
                v-model="queryForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleQuery">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>

          <div class="table-actions">
            <el-button type="primary" @click="handleUpload">
              <el-icon><Upload /></el-icon>
              上传文档
            </el-button>
            <el-button @click="handleCreateFolder">
              <el-icon><FolderAdd /></el-icon>
              新建文件夹
            </el-button>
          </div>

          <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="文件名" show-overflow-tooltip>
              <template #default="{ row }">
                <el-icon class="mr-10"><Document /></el-icon>
                {{ row.name }}
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="100">
              <template #default="{ row }">
                <el-tag size="small">{{ getTypeText(row.type) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="version" label="版本" width="80" />
            <el-table-column prop="uploader" label="上传人" width="100" />
            <el-table-column prop="uploadTime" label="上传时间" width="180" />
            <el-table-column prop="size" label="大小" width="100">
              <template #default="{ row }">
                {{ formatFileSize(row.size) }}
              </template>
            </el-table-column>
            <el-table-column prop="permissions" label="权限" width="100">
              <template #default="{ row }">
                <el-tag :type="getPermissionType(row.permissions)" size="small">
                  {{ getPermissionText(row.permissions) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handlePreview(row)">预览</el-button>
                <el-button type="primary" link @click="handleDownload(row)">下载</el-button>
                <el-button type="primary" link @click="handleVersion(row)">版本</el-button>
                <el-button type="primary" link @click="handlePermission(row)">权限</el-button>
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
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-model="uploadVisible"
      title="上传文档"
      width="600px"
    >
      <el-form :model="uploadForm" label-width="100px">
        <el-form-item label="选择文件">
          <el-upload
            v-model:file-list="uploadFileList"
            action="#"
            :auto-upload="false"
            multiple
            drag
          >
            <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="文档类型">
          <el-select v-model="uploadForm.type" placeholder="请选择文档类型">
            <el-option label="制度" value="system" />
            <el-option label="流程" value="process" />
            <el-option label="资料" value="material" />
          </el-select>
        </el-form-item>
        <el-form-item label="权限设置">
          <el-radio-group v-model="uploadForm.permissions">
            <el-radio label="view">仅查看</el-radio>
            <el-radio label="edit">可编辑</el-radio>
            <el-radio label="download">可下载</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="uploadVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUploadSubmit">上传</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="versionVisible"
      title="版本管理"
      width="800px"
    >
      <el-table :data="currentDocument?.versions" style="width: 100%">
        <el-table-column prop="version" label="版本号" width="100" />
        <el-table-column prop="uploadTime" label="上传时间" width="180" />
        <el-table-column prop="uploader" label="上传人" width="120" />
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleRollback(row)">回滚</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button @click="versionVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="permissionVisible"
      title="权限设置"
      width="500px"
    >
      <el-form :model="permissionForm" label-width="100px">
        <el-form-item label="权限类型">
          <el-radio-group v-model="permissionForm.permissions">
            <el-radio label="view">仅查看</el-radio>
            <el-radio label="edit">可编辑</el-radio>
            <el-radio label="download">可下载</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="permissionVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePermissionSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Document } from '@/types'
import { formatFileSize } from '@/utils'

const loading = ref(false)
const uploadVisible = ref(false)
const versionVisible = ref(false)
const permissionVisible = ref(false)
const uploadFileList = ref<any[]>([])

const queryForm = reactive({
  name: '',
  uploader: '',
  dateRange: []
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const uploadForm = reactive({
  type: 'system',
  permissions: 'view'
})

const permissionForm = reactive({
  permissions: 'view'
})

const folderData = [
  {
    id: '1',
    name: '技术部',
    children: [
      { id: '1-1', name: '制度' },
      { id: '1-2', name: '流程' },
      { id: '1-3', name: '资料' }
    ]
  },
  {
    id: '2',
    name: '行政部',
    children: [
      { id: '2-1', name: '制度' },
      { id: '2-2', name: '流程' },
      { id: '2-3', name: '资料' }
    ]
  },
  {
    id: '3',
    name: '人力资源部',
    children: [
      { id: '3-1', name: '制度' },
      { id: '3-2', name: '流程' },
      { id: '3-3', name: '资料' }
    ]
  }
]

const tableData = ref<Document[]>([
  {
    id: '1',
    name: '员工管理制度.pdf',
    type: 'system',
    category: '技术部/制度',
    path: '/documents/tech/system/员工管理制度.pdf',
    version: 3,
    versions: [
      { version: 1, uploadTime: '2024-01-10 10:00:00', uploader: '张三' },
      { version: 2, uploadTime: '2024-02-15 14:00:00', uploader: '李四' },
      { version: 3, uploadTime: '2024-03-20 09:00:00', uploader: '王五' }
    ],
    permissions: 'download',
    uploader: '王五',
    uploadTime: '2024-03-20 09:00:00',
    size: 2048576,
    keywords: ['员工', '管理', '制度']
  },
  {
    id: '2',
    name: '请假流程.docx',
    type: 'process',
    category: '技术部/流程',
    path: '/documents/tech/process/请假流程.docx',
    version: 2,
    versions: [
      { version: 1, uploadTime: '2024-02-01 10:00:00', uploader: '张三' },
      { version: 2, uploadTime: '2024-03-15 14:00:00', uploader: '李四' }
    ],
    permissions: 'edit',
    uploader: '李四',
    uploadTime: '2024-03-15 14:00:00',
    size: 1048576,
    keywords: ['请假', '流程']
  },
  {
    id: '3',
    name: '项目资料.xlsx',
    type: 'material',
    category: '技术部/资料',
    path: '/documents/tech/material/项目资料.xlsx',
    version: 1,
    versions: [
      { version: 1, uploadTime: '2024-03-10 10:00:00', uploader: '赵六' }
    ],
    permissions: 'view',
    uploader: '赵六',
    uploadTime: '2024-03-10 10:00:00',
    size: 524288,
    keywords: ['项目', '资料']
  }
])

const currentDocument = ref<Document | null>(null)

const getTypeText = (type: string) => {
  const map: Record<string, string> = {
    system: '制度',
    process: '流程',
    material: '资料'
  }
  return map[type] || '未知'
}

const getPermissionType = (permissions: string) => {
  const map: Record<string, any> = {
    view: 'info',
    edit: 'warning',
    download: 'success'
  }
  return map[permissions] || 'info'
}

const getPermissionText = (permissions: string) => {
  const map: Record<string, string> = {
    view: '仅查看',
    edit: '可编辑',
    download: '可下载'
  }
  return map[permissions] || '未知'
}

const handleNodeClick = (data: any) => {
  console.log('选中文件夹:', data)
  handleQuery()
}

const handleQuery = () => {
  loading.value = true
  setTimeout(() => {
    pagination.total = 3
    loading.value = false
  }, 500)
}

const handleReset = () => {
  queryForm.name = ''
  queryForm.uploader = ''
  queryForm.dateRange = []
  handleQuery()
}

const handleUpload = () => {
  uploadVisible.value = true
}

const handleCreateFolder = () => {
  ElMessage.info('新建文件夹功能开发中')
}

const handleAddFolder = () => {
  ElMessage.info('添加文件夹功能开发中')
}

const handlePreview = (row: Document) => {
  ElMessage.success(`预览文件：${row.name}`)
}

const handleDownload = (row: Document) => {
  ElMessage.success(`下载文件：${row.name}`)
}

const handleVersion = (row: Document) => {
  currentDocument.value = row
  versionVisible.value = true
}

const handleRollback = (row: any) => {
  ElMessage.success(`回滚到版本 ${row.version}`)
}

const handlePermission = (row: Document) => {
  currentDocument.value = row
  permissionForm.permissions = row.permissions
  permissionVisible.value = true
}

const handlePermissionSubmit = () => {
  if (currentDocument.value) {
    currentDocument.value.permissions = permissionForm.permissions as any
  }
  permissionVisible.value = false
  ElMessage.success('权限设置成功')
}

const handleDelete = async (row: Document) => {
  try {
    await ElMessageBox.confirm('确定要删除该文档吗？', '提示', {
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

const handleUploadSubmit = () => {
  ElMessage.success('上传成功')
  uploadVisible.value = false
  uploadFileList.value = []
  handleQuery()
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

.folder-tree {
  height: calc(100vh - 200px);
  overflow-y: auto;

  .custom-tree-node {
    display: flex;
    align-items: center;
    flex: 1;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>