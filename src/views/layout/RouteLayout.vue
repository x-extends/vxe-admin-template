<template>
  <!--方式一：页签缓存功能开启-->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive :include="userStore.tabRouteNameList">
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
  <!--方式二：页签缓存功能关闭-->
  <router-view />
</template>

<script lang="ts" setup>
// import { useUserStore } from '@/store/user'

// const userStore = useUserStore()
</script>
