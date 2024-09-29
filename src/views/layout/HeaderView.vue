<template>
  <div class="page-header">
    <div class="header-left">
      <vxe-button class="collapseBtn" mode="text" :icon="collapseAside ? 'vxe-icon-menu-unfold' : 'vxe-icon-menu-fold'" @click="toggleCollapseAside()"></vxe-button>
    </div>
    <div v-if="userInfo" class="header-right">
      <span class="right-item">
        <vxe-link icon="vxe-icon-github-fill" href="https://github.com/x-extends/vxe-admin-template/tree/v3" target="_blank">Github</vxe-link>
        <vxe-link href="https://gitee.com/x-extends/vxe-admin-template/tree/v3/" target="_blank">
          <vxe-icon status="error" name="gitee-fill"></vxe-icon>
          <span>Gitee</span>
        </vxe-link>
      </span>

      <span class="right-item">
        <vxe-switch
          class="right-item-comp"
          v-model="currTheme"
          size="mini"
          open-value="light"
          open-label="白天"
          close-value="dark"
          close-label="夜间">
        </vxe-switch>
      </span>

      <span class="right-item">
        <vxe-pulldown :options="langPullList" trigger="click" class="right-item-comp" show-popup-shadow transfer  @option-click="langOptionClickEvent">
          <vxe-button mode="text" icon="vxe-icon-language-switch" :content="langLabel"></vxe-button>
        </vxe-pulldown>
      </span>

      <span v-if="userInfo.roleList && userInfo.roleList.length > 1" class="right-item">
        <span class="right-item-title">角色：</span>
        <vxe-pulldown :options="userInfo.roleList" trigger="click" class="right-item-comp" show-popup-shadow transfer  @option-click="roleOptionClickEvent">
          <template #default>
            <vxe-text>{{ userInfo.roleName }}</vxe-text>
            <vxe-icon name="caret-down"></vxe-icon>
          </template>
        </vxe-pulldown>
      </span>

      <vxe-pulldown class="right-item" :options="userPullList" trigger="click" show-popup-shadow transfer @option-click="userOptionClickEvent">
        <template #default>
          <div class="user-avatar">
            <vxe-text>{{ userInfo.nickname || userInfo.name }}</vxe-text>
            <img v-if="userInfo.pictureUrl" class="user-picture" :src="userInfo.pictureUrl" />
            <img v-else class="user-picture" src="@/assets/default-picture.png">
          </div>
        </template>
      </vxe-pulldown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      langPullList: [
        { label: '中文', value: 'zh-CN' },
        { label: '英文', value: 'en-US' }
      ],

      userPullList: [
        { label: '退出登录', value: 'logout' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'language',
      'theme',
      'collapseAside',
      'defaultHomeMenu'
    ]),
    langLabel () {
      const item = this.langPullList.find(item => item.value === this.language)
      return item ? item.label : this.language
    },
    currTheme: {
      get () {
        return this.theme
      },
      set (name) {
        this.setTheme(name)
      }
    }
  },
  methods: {
    ...mapActions([
      'logoutServer',
      'setTheme',
      'setLanguage',
      'changeUserRole',
      'toggleCollapseAside'
    ]),
    logoutEvent () {
      this.logoutServer().then(() => {
        this.$router.push({
          name: 'LoginView'
        })
      })
    },
    langOptionClickEvent ({ option }) {
      this.setLanguage(option.value)
    },
    roleOptionClickEvent ({ option }) {
      this.changeUserRole(option.value).then(() => {
        // 切换角色默认跳转到第一个有权限的路由
        const defaultHomeMenu = this.defaultHomeMenu
        if (defaultHomeMenu) {
          this.$router.push(defaultHomeMenu.routerLink)
        } else {
          this.$router.push({
            name: 'PageError403'
          })
        }
      })
    },
    userOptionClickEvent ({ option }) {
      switch (option.value) {
        case 'logout': {
          this.logoutEvent()
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding: 0 16px;
  border-bottom: 1px solid var(--page-layout-border-color);

  .header-left {
    flex-grow: 1;
  }

  .header-right {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    align-items: center;
  }

  .right-item {
    cursor: pointer;
    margin-left: 24px;
  }
  .right-item-title {
    vertical-align: middle;
  }

  .right-item-comp {
    vertical-align: middle;
  }

  .user-avatar {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  .user-picture {
    width: 24px;
    height: 24px;
    margin: 0 2px;
  }

  .collapseBtn {
    font-size: 18px;
  }
}
</style>
