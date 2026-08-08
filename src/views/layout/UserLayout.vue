<template>
  <vxe-layout-container :size="componentsSize">
    <vxe-layout-aside class="page-aside" :width="240" :collapsed="collapseAside">
      <AsideView />
    </vxe-layout-aside>
    <vxe-layout-container vertical>
      <vxe-layout-header>
        <HeaderView />
        <TopView />
      </vxe-layout-header>
      <vxe-layout-body class="page-body" show-backtop>
        <!--方式一：页签缓存功能开启-->
        <keep-alive v-if="isTabsCache" :include="tabRouteNameList">
          <router-view />
        </keep-alive>
        <!--方式二：页签缓存功能关闭-->
        <router-view v-else />
      </vxe-layout-body>
      <vxe-layout-footer>
        <FooterView />
      </vxe-layout-footer>
    </vxe-layout-container>
  </vxe-layout-container>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderView from './HeaderView.vue'
import AsideView from './AsideView.vue'
import TopView from './TopView.vue'
import FooterView from './FooterView.vue'

export default {
  components: {
    HeaderView,
    AsideView,
    TopView,
    FooterView
  },
  computed: {
    ...mapGetters([
      'isTabsCache',
      'collapseAside',
      'componentsSize',
      'tabRouteNameList'
    ])
  }
}
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
