<template>
  <!--方式一：页签缓存功能开启-->
  <keep-alive v-if="isTabsCache" :include="tabRouteNameList">
    <router-view />
  </keep-alive>
  <!--方式二：页签缓存功能关闭-->
  <router-view v-else />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RouteLayout',
  computed: {
    ...mapGetters([
      'isTabsCache',
      'tabRouteNameList'
    ])
  }
}
</script>
