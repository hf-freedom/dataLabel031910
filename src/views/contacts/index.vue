<template>
  <div class="page-container">
    <el-card>
      <el-tabs
        v-model="activeTab"
        @tab-change="handleTabChange"
      >
        <el-tab-pane
          label="内部员工"
          name="internal"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card class="dept-tree">
                <template #header>
                  <div class="card-header">
                    <span>部门列表</span>
                  </div>
                </template>
                <el-tree
                  :data="deptData"
                  :props="{ label: 'name', children: 'children' }"
                  node-key="id"
                  default-expand-all
                  @node-click="handleDeptClick"
                >
                  <template #default="{ node, data }">
                    <span class="custom-tree-node">
                      <el-icon><OfficeBuilding /></el-icon>
                      <span class="ml-10">{{ node.label }}</span>
                    </span>
                  </template>
                </el-tree>
              </el-card>
            </el-col>

            <el-col :span="18">
              <el-form
                :inline="true"
                :model="queryForm"
                class="query-form"
              >
                <el-form-item label="姓名">
                  <el-input
                    v-model="queryForm.name"
                    placeholder="请输入姓名"
                    clearable
                  />
                </el-form-item>
                <el-form-item label="职位">
                  <el-input
                    v-model="queryForm.position"
                    placeholder="请输入职位"
                    clearable
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="handleQuery"
                  >
                    查询
                  </el-button>
                  <el-button @click="handleReset">
                    重置
                  </el-button>
                </el-form-item>
              </el-form>

              <el-table
                v-loading="loading"
                :data="internalList"
                style="width: 100%"
              >
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="100"
                />
                <el-table-column
                  prop="department"
                  label="部门"
                  width="120"
                />
                <el-table-column
                  prop="position"
                  label="职位"
                  width="120"
                />
                <el-table-column
                  prop="phone"
                  label="电话"
                  width="130"
                />
                <el-table-column
                  prop="email"
                  label="邮箱"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="操作"
                  width="200"
                  fixed="right"
                >
                  <template #default="{ row }">
                    <el-button
                      type="primary"
                      link
                      @click="handleDetail(row)"
                    >
                      详情
                    </el-button>
                    <el-button
                      type="primary"
                      link
                      @click="handleCall(row)"
                    >
                      拨号
                    </el-button>
                    <el-button
                      type="primary"
                      link
                      @click="handleEmail(row)"
                    >
                      邮件
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                v-model:current-page="pagination.page"
                v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                class="mt-20"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane
          label="外部联系人"
          name="external"
        >
          <el-form
            :inline="true"
            :model="queryForm"
            class="query-form"
          >
            <el-form-item label="姓名">
              <el-input
                v-model="queryForm.name"
                placeholder="请输入姓名"
                clearable
              />
            </el-form-item>
            <el-form-item label="分类">
              <el-select
                v-model="queryForm.category"
                placeholder="请选择分类"
                clearable
              >
                <el-option
                  label="客户"
                  value="客户"
                />
                <el-option
                  label="合作方"
                  value="合作方"
                />
                <el-option
                  label="供应商"
                  value="供应商"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleQuery"
              >
                查询
              </el-button>
              <el-button @click="handleReset">
                重置
              </el-button>
            </el-form-item>
          </el-form>

          <div class="table-actions">
            <el-button
              type="primary"
              @click="handleCreate"
            >
              <el-icon><Plus /></el-icon>
              添加联系人
            </el-button>
            <el-button @click="handleExport">
              导出
            </el-button>
            <el-button @click="handleImport">
              导入
            </el-button>
          </div>

          <el-table
            v-loading="loading"
            :data="externalList"
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="姓名"
              width="100"
            />
            <el-table-column
              prop="category"
              label="分类"
              width="100"
            >
              <template #default="{ row }">
                <el-tag size="small">
                  {{ row.category }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="company"
              label="公司"
              width="150"
            />
            <el-table-column
              prop="position"
              label="职位"
              width="120"
            />
            <el-table-column
              prop="phone"
              label="电话"
              width="130"
            />
            <el-table-column
              prop="email"
              label="邮箱"
              show-overflow-tooltip
            />
            <el-table-column
              prop="isFavorite"
              label="收藏"
              width="80"
            >
              <template #default="{ row }">
                <el-icon
                  :size="20"
                  :color="row.isFavorite ? '#f56c6c' : '#ccc'"
                >
                  <StarFilled v-if="row.isFavorite" />
                  <Star v-else />
                </el-icon>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="250"
              fixed="right"
            >
              <template #default="{ row }">
                <el-button
                  type="primary"
                  link
                  @click="handleDetail(row)"
                >
                  详情
                </el-button>
                <el-button
                  type="primary"
                  link
                  @click="handleEdit(row)"
                >
                  编辑
                </el-button>
                <el-button
                  type="primary"
                  link
                  @click="handleFavorite(row)"
                >
                  {{ row.isFavorite ? '取消收藏' : '收藏' }}
                </el-button>
                <el-button
                  type="danger"
                  link
                  @click="handleDelete(row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            class="mt-20"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-tab-pane>

        <el-tab-pane
          label="常用联系人"
          name="favorite"
        >
          <el-table
            v-loading="loading"
            :data="favoriteList"
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="姓名"
              width="100"
            />
            <el-table-column
              prop="type"
              label="类型"
              width="100"
            >
              <template #default="{ row }">
                <el-tag
                  :type="row.type === 'internal' ? 'primary' : 'success'"
                  size="small"
                >
                  {{ row.type === 'internal' ? '内部' : '外部' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="department"
              label="部门/公司"
              width="150"
            />
            <el-table-column
              prop="position"
              label="职位"
              width="120"
            />
            <el-table-column
              prop="phone"
              label="电话"
              width="130"
            />
            <el-table-column
              prop="email"
              label="邮箱"
              show-overflow-tooltip
            />
            <el-table-column
              label="操作"
              width="200"
              fixed="right"
            >
              <template #default="{ row }">
                <el-button
                  type="primary"
                  link
                  @click="handleCall(row)"
                >
                  拨号
                </el-button>
                <el-button
                  type="primary"
                  link
                  @click="handleEmail(row)"
                >
                  邮件
                </el-button>
                <el-button
                  type="warning"
                  link
                  @click="handleFavorite(row)"
                >
                  取消收藏
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            class="mt-20"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            placeholder="请输入姓名"
          />
        </el-form-item>

        <el-form-item
          label="分类"
          prop="category"
        >
          <el-select
            v-model="formData.category"
            placeholder="请选择分类"
          >
            <el-option
              label="客户"
              value="客户"
            />
            <el-option
              label="合作方"
              value="合作方"
            />
            <el-option
              label="供应商"
              value="供应商"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="公司"
          prop="company"
        >
          <el-input
            v-model="formData.company"
            placeholder="请输入公司名称"
          />
        </el-form-item>

        <el-form-item
          label="职位"
          prop="position"
        >
          <el-input
            v-model="formData.position"
            placeholder="请输入职位"
          />
        </el-form-item>

        <el-form-item
          label="电话"
          prop="phone"
        >
          <el-input
            v-model="formData.phone"
            placeholder="请输入电话"
          />
        </el-form-item>

        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="formData.email"
            placeholder="请输入邮箱"
          />
        </el-form-item>

        <el-form-item label="地址">
          <el-input
            v-model="formData.address"
            type="textarea"
            :rows="2"
            placeholder="请输入地址"
          />
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="formData.remark"
            type="textarea"
            :rows="2"
            placeholder="请输入备注"
          />
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
          确定
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detailVisible"
      title="联系人详情"
      width="600px"
    >
      <div
        v-if="currentContact"
        class="contact-detail"
      >
        <el-descriptions
          :column="2"
          border
        >
          <el-descriptions-item label="姓名">
            {{ currentContact.name }}
          </el-descriptions-item>
          <el-descriptions-item label="类型">
            <el-tag :type="currentContact.type === 'internal' ? 'primary' : 'success'">
              {{ currentContact.type === 'internal' ? '内部员工' : '外部联系人' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="部门/公司">
            {{ currentContact.department || currentContact.company }}
          </el-descriptions-item>
          <el-descriptions-item label="职位">
            {{ currentContact.position }}
          </el-descriptions-item>
          <el-descriptions-item label="电话">
            {{ currentContact.phone }}
          </el-descriptions-item>
          <el-descriptions-item label="邮箱">
            {{ currentContact.email }}
          </el-descriptions-item>
          <el-descriptions-item
            label="地址"
            :span="2"
          >
            {{ currentContact.address || '-' }}
          </el-descriptions-item>
          <el-descriptions-item
            label="备注"
            :span="2"
          >
            {{ currentContact.remark || '-' }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">
          关闭
        </el-button>
        <el-button
          type="primary"
          @click="handleCall(currentContact!)"
        >
          拨号
        </el-button>
        <el-button
          type="primary"
          @click="handleEmail(currentContact!)"
        >
          邮件
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import type { Contact } from '@/types'

const activeTab = ref('internal')
const loading = ref(false)
const dialogVisible = ref(false)
const detailVisible = ref(false)
const dialogTitle = ref('添加联系人')
const formRef = ref<FormInstance>()

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const queryForm = reactive({
  name: '',
  position: '',
  category: ''
})

const formData = reactive({
  id: '',
  name: '',
  category: '',
  company: '',
  position: '',
  phone: '',
  email: '',
  address: '',
  remark: ''
})

const formRules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }]
}

const deptData = [
  {
    id: '1',
    name: '技术部',
    children: [
      { id: '1-1', name: '前端组' },
      { id: '1-2', name: '后端组' },
      { id: '1-3', name: '测试组' }
    ]
  },
  {
    id: '2',
    name: '行政部',
    children: [
      { id: '2-1', name: '行政组' },
      { id: '2-2', name: '后勤组' }
    ]
  },
  {
    id: '3',
    name: '人力资源部',
    children: [
      { id: '3-1', name: '招聘组' },
      { id: '3-2', name: '培训组' }
    ]
  }
]

const internalList = ref<Contact[]>([
  {
    id: '1',
    name: '张三',
    phone: '13800138001',
    email: 'zhangsan@example.com',
    department: '技术部',
    position: '前端工程师',
    type: 'internal'
  },
  {
    id: '2',
    name: '李四',
    phone: '13800138002',
    email: 'lisi@example.com',
    department: '技术部',
    position: '后端工程师',
    type: 'internal'
  },
  {
    id: '3',
    name: '王五',
    phone: '13800138003',
    email: 'wangwu@example.com',
    department: '行政部',
    position: '行政专员',
    type: 'internal'
  }
])

const externalList = ref<Contact[]>([
  {
    id: '4',
    name: '赵六',
    phone: '13900139001',
    email: 'zhaoliu@client.com',
    company: '客户公司A',
    position: '项目经理',
    type: 'external',
    category: '客户',
    isFavorite: true
  },
  {
    id: '5',
    name: '孙七',
    phone: '13900139002',
    email: 'sunqi@partner.com',
    company: '合作方B',
    position: '技术总监',
    type: 'external',
    category: '合作方',
    isFavorite: false
  }
])

const favoriteList = ref<Contact[]>([
  {
    id: '4',
    name: '赵六',
    phone: '13900139001',
    email: 'zhaoliu@client.com',
    company: '客户公司A',
    position: '项目经理',
    type: 'external',
    category: '客户',
    isFavorite: true
  }
])

const currentContact = ref<Contact | null>(null)

const handleTabChange = (tab: string) => {
  activeTab.value = tab
  handleQuery()
}

const handleQuery = () => {
  loading.value = true
  setTimeout(() => {
    if (activeTab.value === 'internal') {
      pagination.total = internalList.value.length
    } else if (activeTab.value === 'external') {
      pagination.total = externalList.value.length
    } else {
      pagination.total = favoriteList.value.length
    }
    loading.value = false
  }, 500)
}

const handleReset = () => {
  queryForm.name = ''
  queryForm.position = ''
  queryForm.category = ''
  handleQuery()
}

const handleDeptClick = (data: any) => {
  console.log('选中部门:', data)
  handleQuery()
}

const handleCreate = () => {
  dialogTitle.value = '添加联系人'
  dialogVisible.value = true
}

const handleEdit = (row: Contact) => {
  dialogTitle.value = '编辑联系人'
  Object.assign(formData, row)
  dialogVisible.value = true
}

const handleDetail = (row: Contact) => {
  currentContact.value = row
  detailVisible.value = true
}

const handleFavorite = (row: Contact) => {
  row.isFavorite = !row.isFavorite
  ElMessage.success(row.isFavorite ? '已收藏' : '已取消收藏')
  handleQuery()
}

const handleDelete = async (row: Contact) => {
  try {
    await ElMessageBox.confirm('确定要删除该联系人吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const index = externalList.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      externalList.value.splice(index, 1)
    }
    ElMessage.success('删除成功')
    handleQuery()
  } catch {
  }
}

const handleCall = (row: Contact) => {
  ElMessage.success(`正在拨打：${row.phone}`)
}

const handleEmail = (row: Contact) => {
  ElMessage.success(`正在发送邮件至：${row.email}`)
}

const handleExport = () => {
  ElMessage.success('导出成功')
}

const handleImport = () => {
  ElMessage.info('导入功能开发中')
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success(dialogTitle.value === '添加联系人' ? '添加成功' : '编辑成功')
      dialogVisible.value = false
      handleQuery()
    }
  })
}

const handleDialogClose = () => {
  formRef.value?.resetFields()
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

.dept-tree {
  height: calc(100vh - 300px);
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

.contact-detail {
  h3 {
    margin: 20px 0 10px;
    color: #333;
  }
}
</style>