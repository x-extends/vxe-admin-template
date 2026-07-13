<template>
  <div>
    <div class="login-title">
      <img src="@/assets/logo.png">
      <span>用户注册</span>
    </div>
    <vxe-form class="login-form" v-bind="formOptions" @submit="submitEvent">
      <template #privacyAction>
        <div class="login-privacy">
          <vxe-checkbox v-model="allowAgreement">我已阅读并同意</vxe-checkbox>
          <vxe-button status="primary" mode="text" @click="openServiceEvent">服务条款</vxe-button> 和
          <vxe-button status="primary" mode="text" @click="openPrivacyEvent">隐私协议</vxe-button>
        </div>
      </template>
      <template #submitAction>
        <vxe-button type="submit" status="primary" size="xlarge" style="width: 100%;">点击注册</vxe-button>
      </template>
      <template #otherAction>
        <vxe-row>
          <vxe-col span="12"></vxe-col>
          <vxe-col span="12" align="right">
            <span>
              <span style="margin-left: 16px;">已有账号？</span>
              <vxe-link status="primary" :router-link="{ name: 'LoginView' }">立即登录</vxe-link>
            </span>
          </vxe-col>
        </vxe-row>
      </template>
    </vxe-form>

    <UserService ref="userServiceRef"></UserService>
    <UserPrivacy ref="userPrivacyRef"></UserPrivacy>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, useTemplateRef } from 'vue'
import { VxeUI, VxeFormProps } from 'vxe-pc-ui'
import { postPubAdminLoginRegister } from '@/api/login'
import UserService from './UserService.vue'
import UserPrivacy from './UserPrivacy.vue'

interface FormDataVO {
  name: string
  password: string
  confirmPassword: string
}

const userServiceRef = useTemplateRef('userServiceRef')
const userPrivacyRef = useTemplateRef('userPrivacyRef')

const allowAgreement = ref(false)

const formOptions = reactive<VxeFormProps<FormDataVO>>({
  titleWidth: 100,
  titleAlign: 'right',
  vertical: true,
  data: {
    name: '',
    password: '',
    confirmPassword: ''
  },
  rules: {
    name: [
      { required: true, message: '请输入用户名' }
    ],
    password: [
      { required: true, message: '请输入密码' }
    ],
    confirmPassword: [
      { required: true, message: '请再次输入密码' }
    ],
    email: [
      { required: true, message: '请输入邮箱' }
    ]
  },
  items: [
    { field: 'name', title: '用户名', span: 24, itemRender: { name: 'VxeInput', props: { size: 'xlarge', placeholder: '用户名由 4-14 位字母/数字组成', prefixIcon: 'vxe-icon-user-fill' } } },
    { field: 'password', title: '密码', span: 24, itemRender: { name: 'VxePasswordInput', props: { size: 'xlarge', placeholder: '密码由 4-18 位字母/数字/特殊字符组成', autoComplete: 'new-password', prefixIcon: 'vxe-icon-lock-fill' } } },
    { field: 'confirmPassword', title: '确认密码', span: 24, itemRender: { name: 'VxePasswordInput', props: { size: 'xlarge', placeholder: '请再次输入密码', autoComplete: 'new-password', prefixIcon: 'vxe-icon-lock-fill' } } },
    { field: 'email', title: '邮箱', span: 24, itemRender: { name: 'VxeInput', props: { size: 'xlarge', placeholder: '请输入邮箱', prefixIcon: 'vxe-icon-envelope-fill' } } },
    { span: 24, slots: { default: 'privacyAction' } },
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

const submitEvent = () => {
  VxeUI.loading.open({
    text: '正在注册，请稍等片刻...'
  })
  postPubAdminLoginRegister(formOptions.data).then(() => {
    VxeUI.loading.close()
  }).finally(() => {
    VxeUI.loading.close()
  })
}
</script>
