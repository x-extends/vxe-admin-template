<template>
  <vxe-layout-container>
    <vxe-layout-aside class="page-aside" :width="240" :collapsed="appStore.collapseAside">
      <AsideView />
    </vxe-layout-aside>
    <vxe-layout-container vertical>
      <vxe-layout-header>
        <HeaderView />
        <TopView />
      </vxe-layout-header>
      <vxe-layout-body :key="appStore.pageKey" class="page-body">
        <RouterView />
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

const appStore = useAppStore()
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
