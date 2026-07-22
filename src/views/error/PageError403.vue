<template>
  <div class="page-403">
    <svg class="svg-403" xmlns="http://www.w3.org/2000/svg" viewBox="100 60 200 100">
      <circle class="fillBg" cx="200" cy="120" r="70" />
      <path class="strokeColor" d="M 165 120 V 95 A 35 35 0 0 1 235 95 V 120" fill="none" stroke-width="10" stroke-linecap="round" />
      <rect class="fillColor" x="150" y="120" width="100" height="70" rx="12" />
      <circle cx="200" cy="150" r="10" fill="#FFFFFF" />
      <rect x="195" y="150" width="10" height="18" rx="2" fill="#FFFFFF" />
      <circle cx="230" cy="80" r="20" fill="#EF4444" />
      <line x1="219" y1="69" x2="242" y2="89" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />
    </svg>
    <div class="page-403-describe">无权限访问！</div>
    <div>
      <vxe-button status="primary" :router-link="{name: 'HomeList'}" size="xlarge">返回首页</vxe-button>
      <vxe-button size="xlarge" @click="logoutEvent">退出登录</vxe-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const logoutEvent = () => {
  userStore.logoutServer().then(() => {
    router.push({
      name: 'LoginView'
    })
  })
}
</script>

<style lang="scss" scoped>
.page-403 {
  color: var(--vxe-ui-font-color);
  text-align: center;
}
.svg-403 {
  width: 400px;
  height: 400px;
  .fillBg {
    fill: var(--vxe-ui-font-primary-tinge-color);
  }
  .fillColor {
    fill: var(--vxe-ui-font-primary-color);
  }
  .strokeColor {
    stroke: var(--vxe-ui-font-primary-color);
  }
  .fontColor {
    fill: var(--vxe-ui-font-color);
  }
}
.page-403-describe {
  font-size: 30px;
  margin-bottom: 34px;
}
</style>
