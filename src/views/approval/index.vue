<template>
  <div class="page-container">
    <el-card>
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="待审批" name="pending">
          <el-table :data="pendingList" style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="审批标题" show-overflow-tooltip />
            <el-table-column prop="type" label="类型" width="100">
              <template #default="{ row }">
                <StatusTag
                  :type="getApprovalType(row.type).type"
                  :text="getApprovalType(row.type).text"
                />
              </template>
            </el-table-column>
            <el-table-column prop="applicant" label="申请人" width="100" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="applyTime" label="申请时间" width="180" />
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleApprove(row)">审批</el-button>
                <el-button type="primary" link @click="handleDetail(row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="已审批" name="approved">
          <el-table :data="approvedList" style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="审批标题" show-overflow-tooltip />
            <el-table-column prop="type" label="类型" width="100">
              <template #default="{ row }">
                <StatusTag
                  :type="getApprovalType(row.type).type"
                  :text="getApprovalType(row.type).text"
                />
              </template>
            </el-table-column>
            <el-table-column prop="applicant" label="申请人" width="100" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <StatusTag
                  :type="getApprovalStatus(row.status).type"
                  :text="getApprovalStatus(row.status).text"
                />
              </template>
            </el-table-column>
            <el-table-column prop="applyTime" label="申请时间" width="180" />
            <el-table-column label="操作" width="150" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleDetail(row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="我发起的" name="my">
          <TableActions>
            <el-button type="primary" @click="handleCreate">
              <el-icon><Plus /></el-icon>
              发起审批
            </el-button>
          </TableActions>
          <el-table :data="myList" style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="审批标题" show-overflow-tooltip />
            <el-table-column prop="type" label="类型" width="100">
              <template #default="{ row }">
                <StatusTag
                  :type="getApprovalType(row.type).type"
                  :text="getApprovalType(row.type).text"
                />
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <StatusTag
                  :type="getApprovalStatus(row.status).type"
                  :text="getApprovalStatus(row.status).text"
                />
              </template>
            </el-table-column>
            <el-table-column prop="currentApprover" label="当前审批人" width="120" />
            <el-table-column prop="applyTime" label="申请时间" width="180" />
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleDetail(row)">详情</el-button>
                <el-button type="warning" link @click="handleWithdraw(row)" v-if="row.status === ApprovalStatus.PENDING">撤回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <Pagination
        v-model:page="pagination.page"
        v-model:pageSize="pagination.pageSize"
        :total="pagination.total"
        @change="handlePageChange"
      />
    </el-card>

    <el-dialog
      v-model="createVisible"
      title="发起审批"
      width="700px"
      @close="handleCreateClose"
    >
      <el-form
        ref="createFormRef"
        :model="createForm"
        :rules="createRules"
        label-width="100px"
      >
        <el-form-item label="审批类型" prop="type">
          <el-select v-model="createForm.type" placeholder="请选择审批类型" @change="handleTypeChange">
            <el-option label="请假" :value="ApprovalType.LEAVE" />
            <el-option label="报销" :value="ApprovalType.EXPENSE" />
            <el-option label="用印" :value="ApprovalType.SEAL" />
          </el-select>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="createForm.title" placeholder="请输入审批标题" />
        </el-form-item>

        <el-form-item label="审批人" prop="approvers">
          <el-select v-model="createForm.approvers" multiple placeholder="请选择审批人">
            <el-option label="张经理" value="张经理" />
            <el-option label="李总监" value="李总监" />
            <el-option label="王副总" value="王副总" />
          </el-select>
        </el-form-item>

        <template v-if="createForm.type === ApprovalType.LEAVE">
          <el-form-item label="请假类型" prop="leaveType">
            <el-select v-model="createForm.leaveType" placeholder="请选择请假类型">
              <el-option label="事假" value="事假" />
              <el-option label="病假" value="病假" />
              <el-option label="年假" value="年假" />
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="createForm.startTime"
              type="datetime"
              placeholder="选择开始时间"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="createForm.endTime"
              type="datetime"
              placeholder="选择结束时间"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="请假天数" prop="days">
            <el-input-number v-model="createForm.days" :min="0.5" :max="30" :step="0.5" />
          </el-form-item>
          <el-form-item label="请假事由" prop="reason">
            <el-input v-model="createForm.reason" type="textarea" :rows="3" placeholder="请输入请假事由" />
          </el-form-item>
        </template>

        <template v-if="createForm.type === ApprovalType.EXPENSE">
          <el-form-item label="报销类型" prop="expenseType">
            <el-select v-model="createForm.expenseType" placeholder="请选择报销类型">
              <el-option label="差旅费" value="差旅费" />
              <el-option label="办公费" value="办公费" />
              <el-option label="招待费" value="招待费" />
            </el-select>
          </el-form-item>
          <el-form-item label="报销金额" prop="amount">
            <el-input-number v-model="createForm.amount" :min="0" :precision="2" />
          </el-form-item>
          <el-form-item label="报销事由" prop="reason">
            <el-input v-model="createForm.reason" type="textarea" :rows="3" placeholder="请输入报销事由" />
          </el-form-item>
        </template>

        <template v-if="createForm.type === ApprovalType.SEAL">
          <el-form-item label="印章类型" prop="sealType">
            <el-select v-model="createForm.sealType" placeholder="请选择印章类型">
              <el-option label="公章" value="公章" />
              <el-option label="合同章" value="合同章" />
              <el-option label="财务章" value="财务章" />
            </el-select>
          </el-form-item>
          <el-form-item label="用印时间" prop="sealTime">
            <el-date-picker
              v-model="createForm.sealTime"
              type="datetime"
              placeholder="选择用印时间"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="用印事由" prop="reason">
            <el-input v-model="createForm.reason" type="textarea" :rows="3" placeholder="请输入用印事由" />
          </el-form-item>
        </template>

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
        <el-button @click="createVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateSubmit">提交</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="approveVisible"
      title="审批处理"
      width="600px"
    >
      <el-form :model="approveForm" label-width="100px">
        <el-form-item label="审批意见">
          <el-radio-group v-model="approveForm.action">
            <el-radio label="approve">同意</el-radio>
            <el-radio label="reject">驳回</el-radio>
            <el-radio label="transfer">转交</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="转交人" v-if="approveForm.action === 'transfer'">
          <el-select v-model="approveForm.transferTo" placeholder="请选择转交人">
            <el-option label="张经理" value="张经理" />
            <el-option label="李总监" value="李总监" />
          </el-select>
        </el-form-item>
        <el-form-item label="审批意见" v-if="approveForm.action === 'reject'">
          <el-input v-model="approveForm.opinion" type="textarea" :rows="3" placeholder="请输入驳回理由" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="approveVisible = false">取消</el-button>
        <el-button type="primary" @click="handleApproveSubmit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detailVisible"
      title="审批详情"
      width="800px"
    >
      <div class="approval-detail" v-if="currentApproval">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="审批标题">{{ currentApproval.title }}</el-descriptions-item>
          <el-descriptions-item label="审批类型">{{ getApprovalType(currentApproval.type).text }}</el-descriptions-item>
          <el-descriptions-item label="申请人">{{ currentApproval.applicant }}</el-descriptions-item>
          <el-descriptions-item label="部门">{{ currentApproval.department }}</el-descriptions-item>
          <el-descriptions-item label="申请时间">{{ currentApproval.applyTime }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <StatusTag
              :type="getApprovalStatus(currentApproval.status).type"
              :text="getApprovalStatus(currentApproval.status).text"
            />
          </el-descriptions-item>
        </el-descriptions>

        <h3 class="mt-20">审批记录</h3>
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in currentApproval.approvers"
            :key="index"
            :timestamp="item.time"
          >
            <h4>{{ item.name }}</h4>
            <p>审批状态：<StatusTag :type="getApprovalStatus(item.status).type" :text="getApprovalStatus(item.status).text" size="small" /></p>
            <p v-if="item.opinion">审批意见：{{ item.opinion }}</p>
          </el-timeline-item>
        </el-timeline>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { TableActions, Pagination, StatusTag } from '@/components/common'
import { usePagination, useLoading, useStatusMapper } from '@/composables'
import { ApprovalStatus, ApprovalType } from '@/constants'
import { approvalApi } from '@/api'
import type { Approval } from '@/types'
import type { ApprovalCreateForm, ApprovalActionForm } from '@/types/form'

const activeTab = ref('pending')
const { pagination, resetPagination } = usePagination()
const { loading, startLoading, stopLoading } = useLoading()
const { getApprovalStatus, getApprovalType } = useStatusMapper()

const createVisible = ref(false)
const approveVisible = ref(false)
const detailVisible = ref(false)
const createFormRef = ref<FormInstance>()
const fileList = ref<any[]>([])

const createForm = reactive<ApprovalCreateForm>({
  type: '',
  title: '',
  approvers: [],
  leaveType: '',
  startTime: '',
  endTime: '',
  days: 1,
  expenseType: '',
  amount: 0,
  sealType: '',
  sealTime: '',
  reason: ''
})

const createRules: FormRules = {
  type: [{ required: true, message: '请选择审批类型', trigger: 'change' }],
  title: [{ required: true, message: '请输入审批标题', trigger: 'blur' }],
  approvers: [{ required: true, message: '请选择审批人', trigger: 'change' }]
}

const approveForm = reactive<ApprovalActionForm>({
  action: 'approve',
  transferTo: '',
  opinion: ''
})

const currentApproval = ref<Approval | null>(null)

const pendingList = ref<Approval[]>([
  {
    id: '1',
    type: ApprovalType.LEAVE,
    title: '张三-事假申请',
    applicant: '张三',
    department: '技术部',
    applyTime: '2024-03-22 09:00:00',
    status: ApprovalStatus.PENDING,
    currentApprover: '张经理',
    approvers: [
      { name: '张经理', status: ApprovalStatus.PENDING },
      { name: '李总监', status: ApprovalStatus.PENDING }
    ],
    formData: {
      leaveType: '事假',
      startTime: '2024-03-25 09:00:00',
      endTime: '2024-03-26 18:00:00',
      days: 2,
      reason: '家中有事需要处理'
    }
  },
  {
    id: '2',
    type: ApprovalType.EXPENSE,
    title: '李四-差旅费报销',
    applicant: '李四',
    department: '行政部',
    applyTime: '2024-03-22 10:30:00',
    status: ApprovalStatus.PENDING,
    currentApprover: '张经理',
    approvers: [
      { name: '张经理', status: ApprovalStatus.PENDING }
    ],
    formData: {
      expenseType: '差旅费',
      amount: 3500,
      reason: '北京出差交通及住宿费用'
    }
  }
])

const approvedList = ref<Approval[]>([
  {
    id: '3',
    type: ApprovalType.SEAL,
    title: '王五-合同用印申请',
    applicant: '王五',
    department: '人力资源部',
    applyTime: '2024-03-21 14:00:00',
    status: ApprovalStatus.APPROVED,
    currentApprover: '张经理',
    approvers: [
      { name: '张经理', status: ApprovalStatus.APPROVED, opinion: '同意', time: '2024-03-21 15:00:00' }
    ],
    formData: {
      sealType: '公章',
      sealTime: '2024-03-22 10:00:00',
      reason: '劳动合同盖章'
    }
  }
])

const myList = ref<Approval[]>([
  {
    id: '4',
    type: ApprovalType.LEAVE,
    title: '我的请假申请',
    applicant: '我',
    department: '技术部',
    applyTime: '2024-03-20 09:00:00',
    status: ApprovalStatus.PENDING,
    currentApprover: '张经理',
    approvers: [
      { name: '张经理', status: ApprovalStatus.PENDING }
    ],
    formData: {
      leaveType: '年假',
      startTime: '2024-03-25 09:00:00',
      endTime: '2024-03-27 18:00:00',
      days: 3,
      reason: '休假'
    }
  }
])

const handleTabChange = () => {
  resetPagination()
  handleQuery()
}

const handleQuery = () => {
  startLoading()
  setTimeout(() => {
    pagination.total = 3
    stopLoading()
  }, 500)
}

const handlePageChange = () => {
  handleQuery()
}

const handleCreate = () => {
  createVisible.value = true
}

const handleTypeChange = () => {
  createForm.leaveType = ''
  createForm.expenseType = ''
  createForm.sealType = ''
}

const handleCreateClose = () => {
  createFormRef.value?.resetFields()
  fileList.value = []
}

const handleCreateSubmit = async () => {
  if (!createFormRef.value) return
  await createFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('提交成功')
      createVisible.value = false
      handleQuery()
    }
  })
}

const handleApprove = (row: Approval) => {
  currentApproval.value = row
  approveVisible.value = true
}

const handleApproveSubmit = () => {
  ElMessage.success('审批成功')
  approveVisible.value = false
  handleQuery()
}

const handleDetail = (row: Approval) => {
  currentApproval.value = row
  detailVisible.value = true
}

const handleWithdraw = async (row: Approval) => {
  try {
    await ElMessageBox.confirm('确定要撤回该审批吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    row.status = ApprovalStatus.PENDING
    ElMessage.success('撤回成功')
  } catch {
  }
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

.approval-detail {
  padding: 20px;
}

.approval-detail h3 {
  margin: 20px 0 10px;
}
</style>
