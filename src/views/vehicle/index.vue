<template>
  <div class="page-container">
    <el-card>
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="车辆列表" name="vehicle">
          <el-table :data="vehicleList" style="width: 100%" v-loading="loading">
            <el-table-column prop="plateNumber" label="车牌号" width="120" />
            <el-table-column prop="model" label="车型" width="150" />
            <el-table-column prop="driver" label="司机" width="100" />
            <el-table-column prop="driverPhone" label="司机电话" width="130" />
            <el-table-column prop="mileage" label="里程(km)" width="100" />
            <el-table-column prop="lastMaintenance" label="上次保养" width="120" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <StatusTag
                  :type="getVehicleStatus(row.status).type"
                  :text="getVehicleStatus(row.status).text"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleVehicleDetail(row)">详情</el-button>
                <el-button type="primary" link @click="handleMaintenance(row)">保养</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="用车申请" name="application">
          <TableActions>
            <el-button type="primary" @click="handleCreateApplication">
              <el-icon><Plus /></el-icon>
              申请用车
            </el-button>
          </TableActions>
          <el-table :data="applicationList" style="width: 100%" v-loading="loading">
            <el-table-column prop="applicant" label="申请人" width="100" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="useTime" label="用车时间" width="180" />
            <el-table-column prop="returnTime" label="归还时间" width="180" />
            <el-table-column prop="destination" label="目的地" width="150" show-overflow-tooltip />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <StatusTag
                  :type="getVehicleApplicationStatus(row.status).type"
                  :text="getVehicleApplicationStatus(row.status).text"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleApplicationDetail(row)">详情</el-button>
                <el-button type="warning" link @click="handleWithdraw(row)" v-if="row.status === 'pending'">撤回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="调度管理" name="dispatch">
          <el-table :data="pendingDispatchList" style="width: 100%" v-loading="loading">
            <el-table-column prop="applicant" label="申请人" width="100" />
            <el-table-column prop="department" label="部门" width="120" />
            <el-table-column prop="useTime" label="用车时间" width="180" />
            <el-table-column prop="destination" label="目的地" width="150" show-overflow-tooltip />
            <el-table-column prop="requiredModel" label="要求车型" width="120" />
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" link @click="handleDispatch(row)">调度</el-button>
                <el-button type="primary" link @click="handleApplicationDetail(row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="用车记录" name="record">
          <QueryForm :model="queryForm" @query="handleQuery" @reset="handleReset">
            <el-form-item label="申请人">
              <el-input v-model="queryForm.applicant" placeholder="请输入申请人" clearable />
            </el-form-item>
            <el-form-item label="车牌号">
              <el-input v-model="queryForm.plateNumber" placeholder="请输入车牌号" clearable />
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
          </QueryForm>
          <el-table :data="recordList" style="width: 100%" v-loading="loading">
            <el-table-column prop="applicant" label="申请人" width="100" />
            <el-table-column prop="assignedVehicle" label="车辆" width="120" />
            <el-table-column prop="assignedDriver" label="司机" width="100" />
            <el-table-column prop="useTime" label="用车时间" width="180" />
            <el-table-column prop="returnTime" label="归还时间" width="180" />
            <el-table-column prop="mileage" label="里程(km)" width="100" />
            <el-table-column prop="cost" label="费用(元)" width="100" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <StatusTag
                  :type="getVehicleApplicationStatus(row.status).type"
                  :text="getVehicleApplicationStatus(row.status).text"
                />
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
        <el-form-item label="用车时间" prop="useTime">
          <el-date-picker
            v-model="applicationForm.useTime"
            type="datetime"
            placeholder="选择用车时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="归还时间" prop="returnTime">
          <el-date-picker
            v-model="applicationForm.returnTime"
            type="datetime"
            placeholder="选择归还时间"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="目的地" prop="destination">
          <el-input v-model="applicationForm.destination" placeholder="请输入目的地" />
        </el-form-item>

        <el-form-item label="用车事由" prop="reason">
          <el-input v-model="applicationForm.reason" type="textarea" :rows="3" placeholder="请输入用车事由" />
        </el-form-item>

        <el-form-item label="要求车型">
          <el-select v-model="applicationForm.requiredModel" placeholder="请选择车型（可选）">
            <el-option label="轿车" value="轿车" />
            <el-option label="SUV" value="SUV" />
            <el-option label="商务车" value="商务车" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="applicationVisible = false">取消</el-button>
        <el-button type="primary" @click="handleApplicationSubmit">提交</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dispatchVisible"
      title="车辆调度"
      width="600px"
    >
      <el-form :model="dispatchForm" label-width="100px">
        <el-form-item label="选择车辆">
          <el-select v-model="dispatchForm.vehicleId" placeholder="请选择车辆">
            <el-option
              v-for="vehicle in availableVehicles"
              :key="vehicle.id"
              :label="`${vehicle.plateNumber} - ${vehicle.model}`"
              :value="vehicle.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="指派司机">
          <el-select v-model="dispatchForm.driver" placeholder="请选择司机">
            <el-option label="张师傅" value="张师傅" />
            <el-option label="李师傅" value="李师傅" />
            <el-option label="王师傅" value="王师傅" />
          </el-select>
        </el-form-item>

        <el-form-item label="调度备注">
          <el-input v-model="dispatchForm.remark" type="textarea" :rows="3" placeholder="请输入调度备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dispatchVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDispatchSubmit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detailVisible"
      title="用车详情"
      width="700px"
    >
      <div class="application-detail" v-if="currentApplication">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="申请人">{{ currentApplication.applicant }}</el-descriptions-item>
          <el-descriptions-item label="部门">{{ currentApplication.department }}</el-descriptions-item>
          <el-descriptions-item label="用车时间">{{ currentApplication.useTime }}</el-descriptions-item>
          <el-descriptions-item label="归还时间">{{ currentApplication.returnTime }}</el-descriptions-item>
          <el-descriptions-item label="目的地">{{ currentApplication.destination }}</el-descriptions-item>
          <el-descriptions-item label="用车事由" :span="2">{{ currentApplication.reason }}</el-descriptions-item>
          <el-descriptions-item label="分配车辆">{{ currentApplication.assignedVehicle || '未分配' }}</el-descriptions-item>
          <el-descriptions-item label="分配司机">{{ currentApplication.assignedDriver || '未分配' }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <StatusTag
              :type="getVehicleApplicationStatus(currentApplication.status).type"
              :text="getVehicleApplicationStatus(currentApplication.status).text"
            />
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
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { QueryForm, TableActions, Pagination, StatusTag } from '@/components/common'
import { usePagination, useLoading, useDialog, useStatusMapper } from '@/composables'
import { VehicleStatus, VehicleApplicationStatus } from '@/constants'
import { vehicleApi } from '@/api'
import type { Vehicle, VehicleApplication } from '@/types'
import type { VehicleApplicationFormData, VehicleDispatchFormData } from '@/types/form'

const activeTab = ref('vehicle')
const { loading, withLoading } = useLoading()
const { visible: applicationVisible, open: openApplication, close: closeApplication } = useDialog()
const { visible: dispatchVisible, open: openDispatch, close: closeDispatch } = useDialog()
const { visible: detailVisible, open: openDetail, close: closeDetail } = useDialog()
const applicationFormRef = ref<FormInstance>()

const { pagination, handlePageChange } = usePagination(() => handleQuery())

const queryForm = reactive({
  applicant: '',
  plateNumber: '',
  dateRange: []
})

const applicationForm = reactive<VehicleApplicationFormData>({
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

const dispatchForm = reactive<VehicleDispatchFormData>({
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

const { getVehicleStatus, getVehicleApplicationStatus } = useStatusMapper()

const handleTabChange = (tab: string) => {
  activeTab.value = tab
  handleQuery()
}

const handleQuery = async () => {
  await withLoading(async () => {
    // TODO: 调用 API
    // const res = await vehicleApi.getList({
    //   tab: activeTab.value,
    //   page: pagination.page,
    //   pageSize: pagination.pageSize,
    //   ...queryForm
    // })
    // vehicleList.value = res.data.list
    // pagination.total = res.data.total
    
    if (activeTab.value === 'vehicle') {
      pagination.total = vehicleList.value.length
    } else if (activeTab.value === 'application') {
      pagination.total = applicationList.value.length
    } else if (activeTab.value === 'dispatch') {
      pagination.total = pendingDispatchList.value.length
    } else {
      pagination.total = recordList.value.length
    }
  })
}

const handleReset = () => {
  queryForm.applicant = ''
  queryForm.plateNumber = ''
  queryForm.dateRange = []
  handleQuery()
}

const handleCreateApplication = () => {
  openApplication()
}

const handleApplicationSubmit = async () => {
  if (!applicationFormRef.value) return
  await applicationFormRef.value.validate(async (valid) => {
    if (valid) {
      await withLoading(async () => {
        // TODO: 调用 API
        // await vehicleApi.createApplication(applicationForm)
        ElMessage.success('申请提交成功')
        closeApplication()
        handleQuery()
      })
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
  openDispatch()
}

const handleDispatchSubmit = async () => {
  await withLoading(async () => {
    // TODO: 调用 API
    // await vehicleApi.dispatch(currentApplication.value!.id, dispatchForm)
    if (currentApplication.value) {
      currentApplication.value.status = 'approved'
      const vehicle = vehicleList.value.find(v => v.id === dispatchForm.vehicleId)
      if (vehicle) {
        currentApplication.value.assignedVehicle = vehicle.plateNumber
        currentApplication.value.assignedDriver = dispatchForm.driver
      }
    }
    closeDispatch()
    ElMessage.success('调度成功')
    handleQuery()
  })
}

const handleApplicationDetail = (row: VehicleApplication) => {
  currentApplication.value = row
  openDetail()
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
    await withLoading(async () => {
      // TODO: 调用 API
      // await vehicleApi.withdraw(row.id)
      row.status = 'rejected'
      ElMessage.success('撤回成功')
      handleQuery()
    })
  } catch {
    // 用户取消
  }
}

handleQuery()
</script>

<style scoped lang="scss">
.application-detail {
  h3 {
    margin: 20px 0 10px;
    color: #333;
  }
}
</style>
