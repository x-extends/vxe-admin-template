<template>
  <!--方式一：页签缓存功能开启-->
  <router-view v-if="appStore.isTabsCache" v-slot="{ Component }">
    <keep-alive :include="userStore.tabRouteNameList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!--方式二：页签缓存功能关闭-->
  <router-view v-else />
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

defineOptions({
  name: 'RouteLayout'
})

const appStore = useAppStore()
const userStore = useUserStore()
</script>
