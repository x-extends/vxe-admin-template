<template>
  <div>
    <div class="login-title">
      <img src="@/assets/logo.png">
      <span>用户登录</span>
    </div>
    <div class="login-desc">一个简洁高效、极致流畅的管理系统模板</div>
    <vxe-form class="login-form" v-bind="formOptions" @submit="submitEvent">
      <template #pwdAction>
        <vxe-row>
          <vxe-col span="12">
            <vxe-checkbox v-model="isRememberPassword">记住密码</vxe-checkbox>
          </vxe-col>
          <vxe-col span="12" align="right">
            <vxe-button status="primary" mode="text" @click="forgetPawdEvent">忘记密码？</vxe-button>
          </vxe-col>
        </vxe-row>
      </template>
      <template #submitAction>
        <vxe-button type="submit" status="primary" size="xlarge" suffix-icon="vxe-icon-arrows-right" style="width: 100%;">立即登录</vxe-button>
      </template>
      <template #otherAction>
        <vxe-row>
          <vxe-col span="12"></vxe-col>
          <vxe-col span="12" align="right">
            <span>
              <span style="margin-left: 16px;">没有账号？</span>
              <vxe-link status="primary" :router-link="{ name: 'RegisterView' }">点击注册</vxe-link>
            </span>
          </vxe-col>
        </vxe-row>
        <div class="login-privacy">登录即代表您同意我们的 <vxe-button status="primary" mode="text" @click="openServiceEvent">服务条款</vxe-button> 和 <vxe-button status="primary" mode="text" @click="openPrivacyEvent">隐私协议</vxe-button></div>
      </template>
    </vxe-form>

    <UserService ref="userServiceRef"></UserService>
    <UserPrivacy ref="userPrivacyRef"></UserPrivacy>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { VxeUI, VxeFormProps } from 'vxe-pc-ui'
import { useUserStore } from '@/store/user'
import UserService from './UserService.vue'
import UserPrivacy from './UserPrivacy.vue'

const router = useRouter()
const userStore = useUserStore()

const userServiceRef = useTemplateRef('userServiceRef')
const userPrivacyRef = useTemplateRef('userPrivacyRef')

interface FormDataVO {
  name: string
  password: string
}

const isRememberPassword = ref(true)

const formOptions = reactive<VxeFormProps<FormDataVO>>({
  titleWidth: 100,
  titleAlign: 'right',
  vertical: true,
  data: {
    name: 'test1',
    password: 'test1'
  },
  rules: {
    name: [
      { required: true, message: '请输入用户名' }
    ],
    password: [
      { required: true, message: '请输入密码' }
    ]
  },
  items: [
    { field: 'name', title: '用户名', span: 24, itemRender: { name: 'VxeInput', props: { size: 'xlarge', prefixIcon: 'vxe-icon-user-fill', placeholder: '请输入用户名' } } },
    { field: 'password', title: '密码', span: 24, itemRender: { name: 'VxePasswordInput', props: { size: 'xlarge', prefixIcon: 'vxe-icon-lock-fill' } } },
    { span: 24, slots: { default: 'pwdAction' } },
    { span: 24, slots: { default: 'submitAction' } },
    { span: 24, slots: { default: 'otherAction' } }
  ]
})

const openServiceEvent = () => {
  const $userService = userServiceRef.value
  if ($userService) {
    $userService.open()
  }
}

const openPrivacyEvent = () => {
  const $userPrivacy = userPrivacyRef.value
  if ($userPrivacy) {
    $userPrivacy.open()
  }
}

const forgetPawdEvent = () => {
  VxeUI.modal.message({
    content: '无权限操作',
    status: 'error'
  })
}

const submitEvent = () => {
  VxeUI.loading.open({
    text: '登录验证中...'
  })
  userStore.loginServer(formOptions.data).then(() => {
    VxeUI.loading.close()
    router.push('/')
  }).finally(() => {
    VxeUI.loading.close()
  })
}

</script>
