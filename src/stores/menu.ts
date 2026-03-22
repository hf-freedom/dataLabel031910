import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export interface MenuItem {
  id: string
  title: string
  icon: string
  path: string
  children?: MenuItem[]
}

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref<MenuItem[]>([
    {
      id: '1',
      title: '首页',
      icon: 'HomeFilled',
      path: '/dashboard'
    },
    {
      id: '2',
      title: '公告管理',
      icon: 'Bell',
      path: '/announcement'
    },
    {
      id: '3',
      title: '文档中心',
      icon: 'Document',
      path: '/document'
    },
    {
      id: '4',
      title: '审批流程',
      icon: 'DocumentCopy',
      path: '/approval'
    },
    {
      id: '5',
      title: '会议管理',
      icon: 'Calendar',
      path: '/meeting'
    },
    {
      id: '6',
      title: '车辆调度',
      icon: 'Van',
      path: '/vehicle'
    },
    {
      id: '7',
      title: '通讯录',
      icon: 'User',
      path: '/contacts'
    },
    {
      id: '8',
      title: '任务督办',
      icon: 'List',
      path: '/task'
    },
    {
      id: '9',
      title: '考勤统计',
      icon: 'DataAnalysis',
      path: '/attendance'
    }
  ])

  const activeMenu = ref<string>('/dashboard')
  const collapsed = ref(false)

  const setActiveMenu = (path: string) => {
    activeMenu.value = path
  }

  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value
  }

  const currentMenu = computed(() => {
    const route = useRoute()
    return menuList.value.find(item => item.path === route.path)
  })

  return {
    menuList,
    activeMenu,
    collapsed,
    currentMenu,
    setActiveMenu,
    toggleCollapsed
  }
})