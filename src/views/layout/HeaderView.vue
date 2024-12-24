<template>
  <div class="page-header">
    <div class="header-left">
      <vxe-button class="collapseBtn" mode="text" :icon="collapseAside ? 'vxe-icon-menu-unfold' : 'vxe-icon-menu-fold'" @click="toggleCollapseAside()"></vxe-button>
    </div>
    <div v-if="userInfo" class="header-right">
      <span class="right-item">
        <vxe-link status="primary" href="/admin-template/" target="_blank">切换 v4.x 版本</vxe-link>
      </span>

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
        <vxe-color-picker class="switch-primary-color" v-model="currPrimaryColor" :colors="colorList" size="mini"></vxe-color-picker>
      </span>

      <span class="right-item">
        <vxe-radio-group class="switch-size" v-model="currCompSize" :options="sizeOptions" type="button" size="mini"></vxe-radio-group>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      langPullList: [
        { label: '中文', value: 'zh-CN' },
        { label: '英文', value: 'en-US' }
      ],

      colorList: [
        '#409eff', '#29D2F8', '#31FC49', '#3FF2B3', '#B52DFE', '#FC3243', '#FA3077', '#D1FC44', '#FEE529', '#FA9A2C'
      ],

      sizeOptions: [
        { label: '默认', value: '' },
        { label: '中', value: 'medium' },
        { label: '小', value: 'small' },
        { label: '迷你', value: 'mini' }
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
      'primaryColor',
      'componentsSize',
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
    },
    currPrimaryColor: {
      get () {
        return this.primaryColor
      },
      set (color) {
        this.setPrimaryColor(color || '')
      }
    },
    currCompSize: {
      get () {
        return this.componentsSize
      },
      set (size) {
        this.setComponentsSize(size)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setTheme',
      'setPrimaryColor',
      'setComponentsSize',
      'setLanguage'
    ]),
    ...mapActions([
      'logoutServer',
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
