<template>
  <div class="page-top">
    <div class="page-nav">
      <vxe-tabs
        v-model="selectTab"
        type="round-card"
        :options="tabList"
        :show-body="false"
        :show-close="tabList.length > 1"
        @tab-click="tabClickEvent"
        @tab-close="tabCloseEvent">
        <template #tab-suffix>
          <vxe-pulldown :options="tabOptions" trigger="click" show-popup-shadow transfer
            @option-click="tabOptionClickEvent">
            <template #default>
              <vxe-button mode="text" icon="vxe-icon-ellipsis-v"></vxe-button>
            </template>
          </vxe-pulldown>
        </template>
      </vxe-tabs>
    </div>
    <div class="page-breadcrumb">
      <div class="page-breadcrumb-left">
        <vxe-button mode="text" icon="vxe-icon-arrows-left" class="back-btn" @click="backEvent"></vxe-button>
        <vxe-button mode="text" icon="vxe-icon-refresh" class="refresh-btn" @click="refreshEvent"></vxe-button>
        <vxe-breadcrumb :options="navList"></vxe-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import { routeToMenuName } from '@/utils'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      tabOptions: [
        { label: '关闭其他页签', value: 'closeOther' },
        { label: '关闭左侧页签', value: 'closeLeft' },
        { label: '关闭右侧页签', value: 'closeRight' },
        { label: '重新加载', value: 'refresh' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'activeUserTab',
      'userTabs',
      'menuNameMaps',
      'menuAllTreeList'
    ]),
    navList () {
      const routeName = routeToMenuName(this.$route)
      const rest = XEUtils.findTree(this.menuAllTreeList, item => item.name === routeName, { children: 'children' })
      if (rest) {
        const { nodes } = rest
        return nodes.map((item) => {
          return {
            ...item,
            routerLink: null
          }
        })
      }
      return []
    },
    tabList () {
      return this.userTabs.map(item => {
        const menuItem = this.menuNameMaps[item.name]
        return {
          title: menuItem ? menuItem.title : item.name,
          name: item.name,
          path: item.path,
          routeLink: {
            name: item.routeName,
            query: item.query,
            params: item.params
          },
          permissionCode: item.routeName
        }
      })
    },
    selectTab: {
      get () {
        return this.activeUserTab
      },
      set (value) {
        this.setActiveUserTab(value)
      }
    }
  },
  methods: {
    ...mapActions([
      'reloadPage',
      'clearUserTab',
      'removeUserTab'
    ]),
    ...mapMutations([
      'setActiveUserTab'
    ]),
    backEvent  () {
      this.$router.back()
    },
    refreshEvent () {
      this.reloadPage()
    },
    tabClickEvent ({ name }) {
      const item = this.tabList.find(item => item.name === name)
      if (item) {
        if (item.path !== this.$route.fullPath) {
          this.$router.push(item.path)
        }
      }
    },
    tabCloseEvent ({ name }) {
      const nextItem = this.removeUserTab({ name })
      if (nextItem) {
        if (nextItem.path !== this.$route.fullPath) {
          this.$router.push(nextItem.path)
        }
      }
    },
    tabOptionClickEvent ({ option }) {
      switch (option.value) {
        case 'closeOther':
        case 'closeLeft':
        case 'closeRight':
          this.clearUserTab(option.value)
          break
        case 'refresh':
          this.refreshEvent()
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-top {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  line-height: 40px;
  border-bottom: 1px solid var(--page-layout-border-color);
  .back-btn,
  .refresh-btn {
    font-size: 16px;
    vertical-align: middle;
  }
  .back-btn {
    margin-left: 8px;
  }
  .refresh-btn {
    margin-right: 12px;
  }
}
.page-nav {
  padding-top: 6px;
  padding-right: 16px;
  ::v-deep(.vxe-tabs--round-card) {
    .vxe-tabs-header--item-wrapper {
      padding: 0 8px;
    }
  }
}
.page-breadcrumb {
  display: flex;
  flex-direction: row;
  .page-breadcrumb-left {
    flex-grow: 1;
  }
  .page-breadcrumb-right {
    flex-shrink: 0;
    padding-right: 16px;
  }
}
</style>
