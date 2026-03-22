<template>
  <div class="page-container">
    <el-card>
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="考勤记录" name="record">
          <QueryForm :model="queryForm" @query="handleQuery" @reset="handleReset">
            <el-form-item label="员工姓名">
              <el-input v-model="queryForm.employeeName" placeholder="请输入员工姓名" clearable />
            </el-form-item>
            <el-form-item label="部门">
              <el-select v-model="queryForm.department" placeholder="请选择部门" clearable>
                <el-option label="全部" value="" />
                <el-option label="技术部" value="技术部" />
                <el-option label="行政部" value="行政部" />
                <el-option label="人力资源部" value="人力资源部" />
              </el-select>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                v-model="queryForm.date"
                type="date"
                placeholder="选择日期"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="queryForm.status" placeholder="请选择状态" clearable>
                <el-option label="全部" value="" />
                <el-option label="正常" value="normal" />
                <el-option label="迟到" value="late" />
                <el-option label="早退" value="early_leave" />
                <el-option label="旷工" value="absent" />
                <el-option label="请假" value="leave" />
              </el-select>
            </el-form-item>
          </QueryForm>

          <TableActions>
            <el-button @click="handleExport">
              <el-icon><Download /></el-icon>
              导出Excel
            </el-button>
          </TableActions>

          <el-table :data="recordList" style="width: 100%" v-loading="loading">
            <el-table-column prop="employeeName" label="员工姓名" width="100" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="checkInTime" label="签到时间" width="100" />
            <el-table-column prop="checkOutTime" label="签退时间" width="100" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <StatusTag
                  :type="getAttendanceStatus(row.status).type"
                  :text="getAttendanceStatus(row.status).text"
                />
              </template>
            </el-table-column>
            <el-table-column prop="leaveType" label="请假类型" width="100">
              <template #default="{ row }">
                {{ row.leaveType || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="isAbnormal" label="异常标记" width="100">
              <template #default="{ row }">
                <el-tag :type="row.isAbnormal ? 'danger' : 'success'" size="small">
                  {{ row.isAbnormal ? '异常' : '正常' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleDetail(row)">详情</el-button>
                <el-button type="warning" link @click="handleAbnormal(row)" v-if="row.isAbnormal">标记</el-button>
              </template>
            </el-table-column>
          </el-table>

          <Pagination
            v-model:page="pagination.page"
            v-model:pageSize="pagination.pageSize"
            :total="pagination.total"
            @change="handlePageChange"
          />
        </el-tab-pane>

        <el-tab-pane label="考勤统计" name="statistics">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon" style="background: #409eff">
                    <el-icon :size="32" color="#fff"><User /></el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">{{ statistics.totalEmployees }}</div>
                    <div class="stat-label">总人数</div>
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
                    <div class="stat-value">{{ statistics.normalRate }}%</div>
                    <div class="stat-label">正常出勤率</div>
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
                    <div class="stat-value">{{ statistics.lateCount }}</div>
                    <div class="stat-label">迟到次数</div>
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
                    <div class="stat-value">{{ statistics.absentCount }}</div>
                    <div class="stat-label">旷工次数</div>
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
                    <span>部门考勤统计</span>
                  </div>
                </template>
                <el-table :data="deptStatistics" style="width: 100%">
                  <el-table-column prop="department" label="部门" />
                  <el-table-column prop="total" label="总人数" width="80" />
                  <el-table-column prop="normal" label="正常" width="80" />
                  <el-table-column prop="late" label="迟到" width="80" />
                  <el-table-column prop="earlyLeave" label="早退" width="80" />
                  <el-table-column prop="absent" label="旷工" width="80" />
                  <el-table-column prop="leave" label="请假" width="80" />
                  <el-table-column label="出勤率" width="100">
                    <template #default="{ row }">
                      {{ ((row.normal / row.total) * 100).toFixed(1) }}%
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card>
                <template #header>
                  <div class="card-header">
                    <span>员工考勤排名</span>
                  </div>
                </template>
                <el-table :data="employeeRanking" style="width: 100%">
                  <el-table-column prop="rank" label="排名" width="80" />
                  <el-table-column prop="name" label="姓名" width="100" />
                  <el-table-column prop="department" label="部门" width="120" />
                  <el-table-column prop="normalDays" label="正常天数" width="100" />
                  <el-table-column prop="lateCount" label="迟到次数" width="100" />
                  <el-table-column prop="absentCount" label="旷工次数" width="100" />
                </el-table>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="补卡申请" name="supplement">
          <TableActions>
            <el-button type="primary" @click="handleCreate">
              <el-icon><Plus /></el-icon>
              申请补卡
            </el-button>
          </TableActions>
          <el-table :data="supplementList" style="width: 100%" v-loading="loading">
            <el-table-column prop="employeeName" label="员工姓名" width="100" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="type" label="补卡类型" width="100">
              <template #default="{ row }">
                <el-tag size="small">{{ row.type === 'check_in' ? '签到' : '签退' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="reason" label="补卡原因" show-overflow-tooltip />
            <el-table-column prop="applyTime" label="申请时间" width="180" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.status === 'approved' ? 'success' : row.status === 'rejected' ? 'danger' : 'warning'" size="small">
                  {{ row.status === 'approved' ? '已通过' : row.status === 'rejected' ? '已拒绝' : '待审批' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleDetail(row)">详情</el-button>
                <el-button type="danger" link @click="handleDelete(row)" v-if="row.status === 'pending'">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <Pagination
            v-model:page="pagination.page"
            v-model:pageSize="pagination.pageSize"
            :total="pagination.total"
            @change="handlePageChange"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      title="申请补卡"
      width="600px"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="补卡日期" prop="date">
          <el-date-picker
            v-model="formData.date"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="补卡类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio label="check_in">签到</el-radio>
            <el-radio label="check_out">签退</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="补卡时间" prop="time">
          <el-time-picker
            v-model="formData.time"
            placeholder="选择时间"
            value-format="HH:mm:ss"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="补卡原因" prop="reason">
          <el-input v-model="formData.reason" type="textarea" :rows="3" placeholder="请输入补卡原因" />
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
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detailVisible"
      title="考勤详情"
      width="600px"
    >
      <div class="attendance-detail" v-if="currentRecord">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="员工姓名">{{ currentRecord.employeeName }}</el-descriptions-item>
          <el-descriptions-item label="部门">{{ currentRecord.department }}</el-descriptions-item>
          <el-descriptions-item label="日期">{{ currentRecord.date }}</el-descriptions-item>
          <el-descriptions-item label="签到时间">{{ currentRecord.checkInTime || '-' }}</el-descriptions-item>
          <el-descriptions-item label="签退时间">{{ currentRecord.checkOutTime || '-' }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <StatusTag
              :type="getAttendanceStatus(currentRecord.status).type"
              :text="getAttendanceStatus(currentRecord.status).text"
            />
          </el-descriptions-item>
          <el-descriptions-item label="请假类型" :span="2">
            {{ currentRecord.leaveType || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="异常标记">
            <el-tag :type="currentRecord.isAbnormal ? 'danger' : 'success'">
              {{ currentRecord.isAbnormal ? '异常' : '正常' }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
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
import { QueryForm, TableActions, Pagination, StatusTag } from '@/components/common'
import { usePagination, useLoading, useDialog, useStatusMapper } from '@/composables'
import { AttendanceStatus, SupplementStatus } from '@/constants'
import { attendanceApi } from '@/api'
import type { AttendanceRecord } from '@/types'
import type { SupplementFormData } from '@/types/form'

const activeTab = ref('record')
const { loading, withLoading } = useLoading()
const { visible: dialogVisible, open: openDialog, close: closeDialog } = useDialog()
const { visible: detailVisible, open: openDetail, close: closeDetail } = useDialog()
const formRef = ref<FormInstance>()
const fileList = ref<any[]>([])

const { pagination, handlePageChange } = usePagination(() => handleQuery())

const queryForm = reactive({
  employeeName: '',
  department: '',
  date: '',
  status: ''
})

const formData = reactive<SupplementFormData>({
  date: '',
  type: 'check_in',
  time: '',
  reason: ''
})

const formRules: FormRules = {
  date: [{ required: true, message: '请选择补卡日期', trigger: 'change' }],
  type: [{ required: true, message: '请选择补卡类型', trigger: 'change' }],
  time: [{ required: true, message: '请选择补卡时间', trigger: 'change' }],
  reason: [{ required: true, message: '请输入补卡原因', trigger: 'blur' }]
}

const statistics = reactive({
  totalEmployees: 50,
  normalRate: 95.2,
  lateCount: 23,
  absentCount: 5
})

const deptStatistics = [
  { department: '技术部', total: 20, normal: 18, late: 2, earlyLeave: 0, absent: 0, leave: 2 },
  { department: '行政部', total: 15, normal: 14, late: 1, earlyLeave: 0, absent: 0, leave: 1 },
  { department: '人力资源部', total: 15, normal: 15, late: 0, earlyLeave: 0, absent: 0, leave: 0 }
]

const employeeRanking = [
  { rank: 1, name: '张三', department: '技术部', normalDays: 20, lateCount: 0, absentCount: 0 },
  { rank: 2, name: '李四', department: '技术部', normalDays: 19, lateCount: 1, absentCount: 0 },
  { rank: 3, name: '王五', department: '行政部', normalDays: 19, lateCount: 1, absentCount: 0 }
]

const recordList = ref<AttendanceRecord[]>([
  {
    id: '1',
    employeeId: '001',
    employeeName: '张三',
    department: '技术部',
    date: '2024-03-22',
    checkInTime: '08:55:00',
    checkOutTime: '18:05:00',
    status: 'normal',
    isAbnormal: false
  },
  {
    id: '2',
    employeeId: '002',
    employeeName: '李四',
    department: '技术部',
    date: '2024-03-22',
    checkInTime: '09:10:00',
    checkOutTime: '18:00:00',
    status: 'late',
    isAbnormal: true
  },
  {
    id: '3',
    employeeId: '003',
    employeeName: '王五',
    department: '行政部',
    date: '2024-03-22',
    checkInTime: '08:50:00',
    checkOutTime: '17:30:00',
    status: 'early_leave',
    isAbnormal: true
  },
  {
    id: '4',
    employeeId: '004',
    employeeName: '赵六',
    department: '技术部',
    date: '2024-03-22',
    status: 'leave',
    leaveType: '事假',
    isAbnormal: false
  }
])

const supplementList = ref([
  {
    id: '1',
    employeeName: '李四',
    department: '技术部',
    date: '2024-03-21',
    type: 'check_in',
    reason: '忘记打卡',
    applyTime: '2024-03-22 09:00:00',
    status: 'pending'
  },
  {
    id: '2',
    employeeName: '王五',
    department: '行政部',
    date: '2024-03-20',
    type: 'check_out',
    reason: '系统故障',
    applyTime: '2024-03-21 10:00:00',
    status: 'approved'
  }
])

const currentRecord = ref<AttendanceRecord | null>(null)

const { getAttendanceStatus } = useStatusMapper()

const handleTabChange = (tab: string) => {
  activeTab.value = tab
  handleQuery()
}

const handleQuery = async () => {
  await withLoading(async () => {
    // TODO: 调用 API
    // const res = await attendanceApi.getList({
    //   tab: activeTab.value,
    //   page: pagination.page,
    //   pageSize: pagination.pageSize,
    //   ...queryForm
    // })
    
    if (activeTab.value === 'record') {
      pagination.total = recordList.value.length
    } else if (activeTab.value === 'supplement') {
      pagination.total = supplementList.value.length
    } else {
      pagination.total = 0
    }
  })
}

const handleReset = () => {
  queryForm.employeeName = ''
  queryForm.department = ''
  queryForm.date = ''
  queryForm.status = ''
  handleQuery()
}

const handleCreate = () => {
  openDialog()
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      await withLoading(async () => {
        // TODO: 调用 API
        // await attendanceApi.createSupplement(formData)
        ElMessage.success('提交成功')
        closeDialog()
        handleQuery()
      })
    }
  })
}

const handleDialogClose = () => {
  formRef.value?.resetFields()
  fileList.value = []
}

const handleDetail = (row: any) => {
  if (activeTab.value === 'record') {
    currentRecord.value = row
  }
  openDetail()
}

const handleAbnormal = async (row: AttendanceRecord) => {
  await withLoading(async () => {
    // TODO: 调用 API
    // await attendanceApi.markAbnormal(row.id)
    ElMessage.info('标记异常功能开发中')
  })
}

const handleExport = () => {
  ElMessage.success('导出成功')
}

const handleDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm('确定要删除该申请吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await withLoading(async () => {
      // TODO: 调用 API
      // await attendanceApi.deleteSupplement(row.id)
      const index = supplementList.value.findIndex(item => item.id === row.id)
      if (index > -1) {
        supplementList.value.splice(index, 1)
      }
      ElMessage.success('删除成功')
      handleQuery()
    })
  } catch {
    // 用户取消
  }
}

handleQuery()
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

.attendance-detail {
  h3 {
    margin: 20px 0 10px;
    color: #333;
  }
}
</style>
