import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { cancelAllPending } from '@/utils/request'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'announcement',
        name: 'Announcement',
        component: () => import('@/views/announcement/index.vue'),
        meta: { title: '公告管理' }
      },
      {
        path: 'document',
        name: 'Document',
        component: () => import('@/views/document/index.vue'),
        meta: { title: '文档中心' }
      },
      {
        path: 'approval',
        name: 'Approval',
        component: () => import('@/views/approval/index.vue'),
        meta: { title: '审批流程' }
      },
      {
        path: 'meeting',
        name: 'Meeting',
        component: () => import('@/views/meeting/index.vue'),
        meta: { title: '会议管理' }
      },
      {
        path: 'vehicle',
        name: 'Vehicle',
        component: () => import('@/views/vehicle/index.vue'),
        meta: { title: '车辆调度' }
      },
      {
        path: 'contacts',
        name: 'Contacts',
        component: () => import('@/views/contacts/index.vue'),
        meta: { title: '通讯录' }
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import('@/views/task/index.vue'),
        meta: { title: '任务督办' }
      },
      {
        path: 'attendance',
        name: 'Attendance',
        component: () => import('@/views/attendance/index.vue'),
        meta: { title: '考勤统计' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  cancelAllPending()
  document.title = `${to.meta.title || '企业办公自动化系统'}`
  next()
})

export default router