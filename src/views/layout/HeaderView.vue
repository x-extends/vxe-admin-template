<template>
  <div class="page-header">
    <div class="header-left">
      <vxe-button class="collapseBtn" mode="text" :icon="appStore.collapseAside ? 'vxe-icon-menu-unfold' : 'vxe-icon-menu-fold'" @click="appStore.toggleCollapseAside()"></vxe-button>
    </div>
    <div v-if="userInfo" class="header-right">
      <span class="right-item">
        <vxe-link status="primary" href="/admin-template-v3/" target="_blank">切换 v3.x 版本</vxe-link>
      </span>

      <span class="right-item">
        <vxe-link icon="vxe-icon-github-fill" href="https://github.com/x-extends/vxe-admin-template" target="_blank">Github</vxe-link>
        <vxe-link href="https://gitee.com/x-extends/vxe-admin-template" target="_blank">
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

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { VxeGlobalI18nLocale, VxePulldownEvents } from 'vxe-pc-ui'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const langPullList = ref([
  { label: '中文', value: 'zh-CN' },
  { label: '英文', value: 'en-US' }
])

const langLabel = computed(() => {
  const item = langPullList.value.find(item => item.value === appStore.language)
  return item ? item.label : appStore.language
})

const userPullList = ref([
  { label: '退出登录', value: 'logout' }
])

const currTheme = computed({
  get () {
    return appStore.theme
  },
  set (name) {
    appStore.setTheme(name)
  }
})

const logoutEvent = () => {
  userStore.logoutServer().then(() => {
    router.push({
      name: 'LoginView'
    })
  })
}

const langOptionClickEvent: VxePulldownEvents.OptionClick = ({ option }) => {
  appStore.setLanguage(option.value as VxeGlobalI18nLocale)
}

const roleOptionClickEvent: VxePulldownEvents.OptionClick = ({ option }) => {
  userStore.changeUserRole(option.value).then(() => {
    // 切换角色默认跳转到第一个有权限的路由
    const defaultHomeMenu = userStore.defaultHomeMenu
    if (defaultHomeMenu) {
      router.push(defaultHomeMenu.routerLink)
    } else {
      router.push({
        name: 'PageError403'
      })
    }
  })
}

const userOptionClickEvent: VxePulldownEvents.OptionClick = ({ option }) => {
  switch (option.value) {
    case 'logout': {
      logoutEvent()
      break
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
