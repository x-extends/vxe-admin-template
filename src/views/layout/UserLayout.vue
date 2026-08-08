<template>
  <vxe-layout-container :size="appStore.componentsSize">
    <vxe-layout-aside class="page-aside" :width="240" :collapsed="appStore.collapseAside">
      <AsideView />
    </vxe-layout-aside>
    <vxe-layout-container vertical>
      <vxe-layout-header>
        <HeaderView />
        <TopView />
      </vxe-layout-header>
      <vxe-layout-body class="page-body" show-backtop>
        <!--方式一：页签缓存功能开启-->
        <router-view v-if="appStore.isTabsCache" v-slot="{ Component }">
          <keep-alive :include="userStore.tabRouteNameList">
            <component :is="Component" />
          </keep-alive>
        </router-view>
        <!--方式二：页签缓存功能关闭-->
        <router-view v-else />
      </vxe-layout-body>
      <vxe-layout-footer>
        <FooterView />
      </vxe-layout-footer>
    </vxe-layout-container>
  </vxe-layout-container>
</template>

<script lang="ts" setup>
import HeaderView from './HeaderView.vue'
import AsideView from './AsideView.vue'
import TopView from './TopView.vue'
import FooterView from './FooterView.vue'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

const appStore = useAppStore()
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.page-aside {
  padding: 8px 0;
  border-right: 1px solid var(--page-layout-border-color);
}

.page-body {
  padding: 16px 16px 0 16px;
  background-color: var(--page-layout-background-color);
}
</style>
