<template>
  <div class="aside-view">
    <div class="aside-logo">
      <img class="logo-img" src="@/assets/logo.png" />
      <vxe-link v-if="!collapseAside" href="/" class="logo-title">Vxe 后台管理系统模板v3</vxe-link>
    </div>
    <div class="aside-menu">
      <VxeMenu v-model="currRouteName" :options="menuTreeList" collapse-fixed />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import XEUtils from 'xe-utils'
import { routeToMenuName } from '@/utils'

export default {
  data () {
    return {
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

<style lang="scss" scoped>
.aside-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.aside-view {
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
  }
}

[data-vxe-ui-theme="light"] {
  .aside-view {
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner {
      background-color: #FFFFFF;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #bfbfbf;
    }
    ::-webkit-scrollbar-thumb:hover,
    ::-webkit-scrollbar-thumb:action {
      background-color: #787878;
    }
  }
}

[data-vxe-ui-theme="dark"] {
  .aside-view {
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner {
      background-color: #151518;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #bfbfbf;
    }
    ::-webkit-scrollbar-thumb:hover,
    ::-webkit-scrollbar-thumb:action {
      background-color: #A3A6AD;
    }
  }
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
</style>
