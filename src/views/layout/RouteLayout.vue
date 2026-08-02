<template>
  <!--方式一：页签缓存功能开启-->
  <keep-alive :include="tabRouteNameList">
    <router-view />
  </keep-alive>
  <!--方式二：页签缓存功能关闭-->
  <!-- <router-view /> -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'tabRouteNameList'
    ])
  }
}
</script>
