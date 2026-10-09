<template>
  <div class="aside-view">
    <div class="aside-logo">
      <img class="logo-img" src="@/assets/logo.png" />
      <vxe-link v-if="!appStore.collapseAside" href="/" class="logo-title">VXE 系统模板 V4</vxe-link>
    </div>
    <vxe-scrollbar class="aside-menu" view-inner-class-name="aside-menu-inner" :y-config="yConfig" :x-config="xConfig">
      <vxe-menu v-model="currRouteName" :options="userStore.menuTreeList" collapse-fixed />
    </vxe-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { VxeScrollbarPropTypes } from 'vxe-pc-ui'
import XEUtils from 'xe-utils'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { routeToMenuName } from '@/utils'

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

const currRouteName = ref('')

const xConfig = reactive<VxeScrollbarPropTypes.XConfig>({
  visible: 'hidden'
})

const yConfig = reactive<VxeScrollbarPropTypes.YConfig>({
  autoHide: true
})

const updateSelectMenu = () => {
  XEUtils.eachTree(userStore.menuTreeList, item => {
    if (item.routerLink && item.routerLink.name === route.name) {
      currRouteName.value = routeToMenuName(route)
    }
  })
}

onBeforeRouteUpdate(() => {
  setTimeout(() => updateSelectMenu())
})

watch(route, () => {
  updateSelectMenu()
})

watch(() => userStore.menuTreeList, () => {
  updateSelectMenu()
})

updateSelectMenu()
</script>

<style lang="scss">
.aside-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.aside-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  padding: 8px 16px;
  .logo-img {
    display: block;
    width: 30px;
    height: 30px;
  }
  .logo-title {
    padding-left: 8px;
    font-weight: 700;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.aside-menu {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
.aside-menu-inner {
  min-height: 100%;
}
</style>
