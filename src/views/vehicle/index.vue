<template>
  <div class="page-container">
    <el-card>
      <el-tabs
        v-model="activeTab"
        @tab-change="handleTabChange"
      >
        <el-tab-pane
          label="车辆列表"
          name="vehicle"
        >
          <el-table
            v-loading="loading"
            :data="vehicleList"
            style="width: 100%"
          >
            <el-table-column
              prop="plateNumber"
              label="车牌号"
              width="120"
            />
            <el-table-column
              prop="model"
              label="车型"
              width="150"
            />
            <el-table-column
              prop="driver"
              label="司机"
              width="100"
            />
            <el-table-column
              prop="driverPhone"
              label="司机电话"
              width="130"
            />
            <el-table-column
              prop="mileage"
              label="里程(km)"
              width="100"
            />
            <el-table-column
              prop="lastMaintenance"
              label="上次保养"
              width="120"
            />
            <el-table-column
              prop="status"
              label="状态"
              width="100"
            >
              <template #default="{ row }">
                <el-tag
                  :type="getStatusType(row.status)"
                  size="small"
                >
                  {{ getStatusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              fixed="right"
            >
              <template #default="{ row }">
                <el-button
                  type="primary"
                  link
                  @click="handleVehicleDetail(row)"
                >
                  详情
                </el-button>
                <el-button
                  type="primary"
                  link
                  @click="handleMaintenance(row)"
                >
                  保养
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane
          label="用车申请"
          name="application"
        >
          <div class="table-actions">
            <el-button
              type="primary"
              @click="handleCreateApplication"
            >
              <el-icon><Plus /></el-icon>
              申请用车
            </el-button>
          </div>
          <el-table
            v-loading="loading"
            :data="applicationList"
            style="width: 100%"
          >
            <el-table-column
              prop="applicant"
              label="申请人"
              width="100"
            />
            <el-table-column
              prop="department"
              label="部门"
              width="120"
            />
            <el-table-column
              prop="useTime"
              label="用车时间"
              width="180"
            />
            <el-table-column
              prop="returnTime"
              label="归还时间"
              width="180"
            />
            <el-table-column
              prop="destination"
              label="目的地"
              width="150"
              show-overflow-tooltip
            />
            <el-table-column
              prop="status"
              label="状态"
              width="100"
            >
              <template #default="{ row }">
                <el-tag
                  :type="getApplicationStatusType(row.status)"
                  size="small"
                >
                  {{ getApplicationStatusText(row.status) }}
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
                  @click="handleApplicationDetail(row)"
                >
                  详情
                </el-button>
                <el-button
                  v-if="row.status === 'pending'"
                  type="warning"
                  link
                  @click="handleWithdraw(row)"
                >
                  撤回
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane
          label="调度管理"
          name="dispatch"
        >
          <el-table
            v-loading="loading"
            :data="pendingDispatchList"
            style="width: 100%"
          >
            <el-table-column
              prop="applicant"
              label="申请人"
              width="100"
            />
            <el-table-column
              prop="department"
              label="部门"
              width="120"
            />
            <el-table-column
              prop="useTime"
              label="用车时间"
              width="180"
            />
            <el-table-column
              prop="destination"
              label="目的地"
              width="150"
              show-overflow-tooltip
            />
            <el-table-column
              prop="requiredModel"
              label="要求车型"
              width="120"
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
                  @click="handleDispatch(row)"
                >
                  调度
                </el-button>
                <el-button
                  type="primary"
                  link
                  @click="handleApplicationDetail(row)"
                >
                  详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane
          label="用车记录"
          name="record"
        >
          <el-form
            :inline="true"
            :model="queryForm"
            class="query-form"
          >
            <el-form-item label="申请人">
              <el-input
                v-model="queryForm.applicant"
                placeholder="请输入申请人"
                clearable
              />
            </el-form-item>
            <el-form-item label="车牌号">
              <el-input
                v-model="queryForm.plateNumber"
                placeholder="请输入车牌号"
                clearable
              />
            </el-form-item>
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="queryForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
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
            :data="recordList"
            style="width: 100%"
          >
            <el-table-column
              prop="applicant"
              label="申请人"
              width="100"
            />
            <el-table-column
              prop="assignedVehicle"
              label="车辆"
              width="120"
            />
            <el-table-column
              prop="assignedDriver"
              label="司机"
              width="100"
            />
            <el-table-column
              prop="useTime"
              label="用车时间"
              width="180"
            />
            <el-table-column
              prop="returnTime"
              label="归还时间"
              width="180"
            />
            <el-table-column
              prop="mileage"
              label="里程(km)"
              width="100"
            />
            <el-table-column
              prop="cost"
              label="费用(元)"
              width="100"
            />
            <el-table-column
              prop="status"
              label="状态"
              width="100"
            >
              <template #default="{ row }">
                <el-tag
                  :type="getApplicationStatusType(row.status)"
                  size="small"
                >
                  {{ getApplicationStatusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

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
    </el-card>

    <el-dialog
      v-model="applicationVisible"
      title="申请用车"
      width="600px"
      @close="handleApplicationClose"
    >
      <el-form
        ref="applicationFormRef"
        :model="applicationForm"
        :rules="applicationRules"
        label-width="100px"
      >
        <el-form-item
          label="用车时间"
          prop="useTime"
        >
          <el-date-picker
            v-model="applicationForm.useTime"
            type="datetime"
            placeholder="选择用车时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item
          label="归还时间"
          prop="returnTime"
        >
          <el-date-picker
            v-model="applicationForm.returnTime"
            type="datetime"
            placeholder="选择归还时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item
          label="目的地"
          prop="destination"
        >
          <el-input
            v-model="applicationForm.destination"
            placeholder="请输入目的地"
          />
        </el-form-item>

        <el-form-item
          label="用车事由"
          prop="reason"
        >
          <el-input
            v-model="applicationForm.reason"
            type="textarea"
            :rows="3"
            placeholder="请输入用车事由"
          />
        </el-form-item>

        <el-form-item label="要求车型">
          <el-select
            v-model="applicationForm.requiredModel"
            placeholder="请选择车型（可选）"
          >
            <el-option
              label="轿车"
              value="轿车"
            />
            <el-option
              label="SUV"
              value="SUV"
            />
            <el-option
              label="商务车"
              value="商务车"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="applicationVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleApplicationSubmit"
        >
          提交
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dispatchVisible"
      title="车辆调度"
      width="600px"
    >
      <el-form
        :model="dispatchForm"
        label-width="100px"
      >
        <el-form-item label="选择车辆">
          <el-select
            v-model="dispatchForm.vehicleId"
            placeholder="请选择车辆"
          >
            <el-option
              v-for="vehicle in availableVehicles"
              :key="vehicle.id"
              :label="`${vehicle.plateNumber} - ${vehicle.model}`"
              :value="vehicle.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="指派司机">
          <el-select
            v-model="dispatchForm.driver"
            placeholder="请选择司机"
          >
            <el-option
              label="张师傅"
              value="张师傅"
            />
            <el-option
              label="李师傅"
              value="李师傅"
            />
            <el-option
              label="王师傅"
              value="王师傅"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="调度备注">
          <el-input
            v-model="dispatchForm.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入调度备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dispatchVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleDispatchSubmit"
        >
          确定
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detailVisible"
      title="用车详情"
      width="700px"
    >
      <div
        v-if="currentApplication"
        class="application-detail"
      >
        <el-descriptions
          :column="2"
          border
        >
          <el-descriptions-item label="申请人">
            {{ currentApplication.applicant }}
          </el-descriptions-item>
          <el-descriptions-item label="部门">
            {{ currentApplication.department }}
          </el-descriptions-item>
          <el-descriptions-item label="用车时间">
            {{ currentApplication.useTime }}
          </el-descriptions-item>
          <el-descriptions-item label="归还时间">
            {{ currentApplication.returnTime }}
          </el-descriptions-item>
          <el-descriptions-item label="目的地">
            {{ currentApplication.destination }}
          </el-descriptions-item>
          <el-descriptions-item
            label="用车事由"
            :span="2"
          >
            {{ currentApplication.reason }}
          </el-descriptions-item>
          <el-descriptions-item label="分配车辆">
            {{ currentApplication.assignedVehicle || '未分配' }}
          </el-descriptions-item>
          <el-descriptions-item label="分配司机">
            {{ currentApplication.assignedDriver || '未分配' }}
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getApplicationStatusType(currentApplication.status)">
              {{ getApplicationStatusText(currentApplication.status) }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">
          关闭
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import type { Vehicle, VehicleApplication } from '@/types'

const activeTab = ref('vehicle')
const loading = ref(false)
const applicationVisible = ref(false)
const dispatchVisible = ref(false)
const detailVisible = ref(false)
const applicationFormRef = ref<FormInstance>()

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const queryForm = reactive({
  applicant: '',
  plateNumber: '',
  dateRange: []
})

const applicationForm = reactive({
  useTime: '',
  returnTime: '',
  destination: '',
  reason: '',
  requiredModel: ''
})

const applicationRules: FormRules = {
  useTime: [{ required: true, message: '请选择用车时间', trigger: 'change' }],
  returnTime: [{ required: true, message: '请选择归还时间', trigger: 'change' }],
  destination: [{ required: true, message: '请输入目的地', trigger: 'blur' }],
  reason: [{ required: true, message: '请输入用车事由', trigger: 'blur' }]
}

const dispatchForm = reactive({
  vehicleId: '',
  driver: '',
  remark: ''
})

const vehicleList = ref<Vehicle[]>([
  {
    id: '1',
    plateNumber: '京A12345',
    model: '奥迪A6',
    driver: '张师傅',
    driverPhone: '13800138001',
    status: 'idle',
    mileage: 50000,
    lastMaintenance: '2024-02-15'
  },
  {
    id: '2',
    plateNumber: '京B67890',
    model: '别克GL8',
    driver: '李师傅',
    driverPhone: '13800138002',
    status: 'in_use',
    mileage: 80000,
    lastMaintenance: '2024-01-20'
  },
  {
    id: '3',
    plateNumber: '京C13579',
    model: '大众帕萨特',
    driver: '王师傅',
    driverPhone: '13800138003',
    status: 'maintenance',
    mileage: 65000,
    lastMaintenance: '2024-03-01'
  }
])

const applicationList = ref<VehicleApplication[]>([
  {
    id: '1',
    applicant: '张三',
    department: '技术部',
    useTime: '2024-03-25 09:00:00',
    returnTime: '2024-03-25 18:00:00',
    destination: '北京市朝阳区',
    reason: '客户拜访',
    status: 'pending'
  },
  {
    id: '2',
    applicant: '李四',
    department: '行政部',
    useTime: '2024-03-26 10:00:00',
    returnTime: '2024-03-26 17:00:00',
    destination: '北京市海淀区',
    reason: '物资采购',
    status: 'approved',
    assignedVehicle: '京A12345',
    assignedDriver: '张师傅'
  }
])

const recordList = ref<VehicleApplication[]>([
  {
    id: '3',
    applicant: '王五',
    department: '人力资源部',
    useTime: '2024-03-20 09:00:00',
    returnTime: '2024-03-20 18:00:00',
    destination: '北京市西城区',
    reason: '招聘面试',
    status: 'completed',
    assignedVehicle: '京A12345',
    assignedDriver: '张师傅',
    mileage: 50,
    cost: 200
  }
])

const currentApplication = ref<VehicleApplication | null>(null)

const availableVehicles = computed(() => {
  return vehicleList.value.filter(v => v.status === 'idle')
})

const pendingDispatchList = computed(() => {
  return applicationList.value.filter(a => a.status === 'pending')
})

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    idle: '空闲',
    in_use: '使用中',
    maintenance: '维修中'
  }
  return map[status] || '未知'
}

const getStatusType = (status: string) => {
  const map: Record<string, any> = {
    idle: 'success',
    in_use: 'warning',
    maintenance: 'danger'
  }
  return map[status] || 'info'
}

const getApplicationStatusText = (status: string) => {
  const map: Record<string, string> = {
    pending: '待审批',
    approved: '已批准',
    rejected: '已拒绝',
    in_use: '使用中',
    completed: '已完成'
  }
  return map[status] || '未知'
}

const getApplicationStatusType = (status: string) => {
  const map: Record<string, any> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    in_use: 'primary',
    completed: 'info'
  }
  return map[status] || 'info'
}

const handleTabChange = (tab: string) => {
  activeTab.value = tab
  handleQuery()
}

const handleQuery = () => {
  loading.value = true
  setTimeout(() => {
    if (activeTab.value === 'vehicle') {
      pagination.total = vehicleList.value.length
    } else if (activeTab.value === 'application') {
      pagination.total = applicationList.value.length
    } else if (activeTab.value === 'dispatch') {
      pagination.total = pendingDispatchList.value.length
    } else {
      pagination.total = recordList.value.length
    }
    loading.value = false
  }, 500)
}

const handleReset = () => {
  queryForm.applicant = ''
  queryForm.plateNumber = ''
  queryForm.dateRange = []
  handleQuery()
}

const handleCreateApplication = () => {
  applicationVisible.value = true
}

const handleApplicationSubmit = async () => {
  if (!applicationFormRef.value) return
  await applicationFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('申请提交成功')
      applicationVisible.value = false
      handleQuery()
    }
  })
}

const handleApplicationClose = () => {
  applicationFormRef.value?.resetFields()
}

const handleDispatch = (row: VehicleApplication) => {
  currentApplication.value = row
  dispatchForm.vehicleId = ''
  dispatchForm.driver = ''
  dispatchForm.remark = ''
  dispatchVisible.value = true
}

const handleDispatchSubmit = () => {
  if (currentApplication.value) {
    currentApplication.value.status = 'approved'
    const vehicle = vehicleList.value.find(v => v.id === dispatchForm.vehicleId)
    if (vehicle) {
      currentApplication.value.assignedVehicle = vehicle.plateNumber
      currentApplication.value.assignedDriver = dispatchForm.driver
    }
  }
  dispatchVisible.value = false
  ElMessage.success('调度成功')
  handleQuery()
}

const handleApplicationDetail = (row: VehicleApplication) => {
  currentApplication.value = row
  detailVisible.value = true
}

const handleVehicleDetail = (row: Vehicle) => {
  ElMessage.info(`车辆详情：${row.plateNumber}`)
}

const handleMaintenance = (row: Vehicle) => {
  ElMessage.info(`保养记录：${row.plateNumber}`)
}

const handleWithdraw = async (row: VehicleApplication) => {
  try {
    await ElMessageBox.confirm('确定要撤回该申请吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    row.status = 'rejected'
    ElMessage.success('撤回成功')
    handleQuery()
  } catch {
  }
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

.application-detail {
  h3 {
    margin: 20px 0 10px;
    color: #333;
  }
}
</style>