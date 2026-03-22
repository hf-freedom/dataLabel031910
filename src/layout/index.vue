<template>
  <el-container class="layout-container">
    <el-aside width="240px" class="aside">
      <div class="logo">
        <el-icon :size="28"><OfficeBuilding /></el-icon>
        <span>办公自动化</span>
      </div>
      <el-menu
        :default-active="menuStore.activeMenu"
        :router="true"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        @select="handleMenuSelect"
      >
        <el-menu-item
          v-for="item in menuStore.menuList"
          :key="item.id"
          :index="item.path"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>{{ currentRoute.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <div class="user-info">
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <span class="username">{{ userStore.userInfo?.name || '管理员' }}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="settings">系统设置</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()

const currentRoute = computed(() => route)

// 监听路由变化，更新当前激活的菜单
watch(() => route.path, (newPath) => {
  const menuItem = menuStore.menuList.find(item => item.path === newPath)
  if (menuItem) {
    menuStore.setActiveMenu(newPath)
  }
}, { immediate: true })

const handleMenuSelect = (index: string) => {
  menuStore.setActiveMenu(index)
}

const handleCommand = async (command: string) => {
  if (command === 'logout') {
    try {
      await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      userStore.logout()
      router.push('/login')
      ElMessage.success('退出成功')
    } catch {
    }
  } else if (command === 'profile') {
    ElMessage.info('个人中心功能开发中')
  } else if (command === 'settings') {
    ElMessage.info('系统设置功能开发中')
  }
}

// onMounted 钩子已移除，路由监听在 watch 中处理
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
}

.aside {
  background-color: #304156;
  overflow-x: hidden;

  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #1f2d3d;

    .el-icon {
      margin-right: 10px;
    }
  }

  .el-menu {
    border-right: none;
  }
}

.header {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .header-left {
    flex: 1;
  }

  .header-right {
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;

      .username {
        margin: 0 10px;
        font-size: 14px;
      }
    }
  }
}

.main {
  background: #f0f2f5;
  overflow-y: auto;
}
</style>