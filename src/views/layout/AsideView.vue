<template>
  <div class="aside-view">
    <div class="aside-logo">
      <img class="logo-img" src="@/assets/logo.png" />
      <vxe-link v-if="!collapseAside" href="/" class="logo-title">VXE 系统模板 V3</vxe-link>
    </div>
    <vxe-scrollbar class="aside-menu" view-inner-class-name="aside-menu-inner" :y-config="yConfig" :x-config="xConfig">
      <vxe-menu v-model="currRouteName" :options="menuTreeList" collapse-fixed />
    </vxe-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import XEUtils from 'xe-utils'
import { routeToMenuName } from '@/utils'

export default {
  data () {
    const xConfig = {
      visible: 'hidden'
    }

    const yConfig = {
      autoHide: true
    }

    return {
      xConfig,
      yConfig,
      currRouteName: ''
    }
  },
  computed: {
    ...mapGetters([
      'collapseAside',
      'menuTreeList'
    ])
  },
  methods: {
    updateSelectMenu () {
      XEUtils.eachTree(this.menuTreeList, item => {
        if (item.routerLink && item.routerLink.name === this.$route.name) {
          this.currRouteName = routeToMenuName(this.$route)
        }
      })
    }
  },
  watch: {
    $route () {
      this.updateSelectMenu()
    },
    menuTreeList () {
      this.updateSelectMenu()
    }
  },
  created () {
    this.updateSelectMenu()
  },
  beforeRouteUpdate () {
    setTimeout(() => this.updateSelectMenu())
  }
}
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
  height: 100%;
}
</style>
