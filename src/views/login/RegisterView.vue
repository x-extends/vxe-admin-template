<template>
  <div>
    <div class="login-title">
      <img src="@/assets/logo.png">
      <span>用户注册</span>
    </div>
    <vxe-form v-bind="formOptions" @submit="submitEvent">
      <template #privacyAction>
        <vxe-checkbox v-model="allowAgreement">我已阅读并同意</vxe-checkbox>
        <vxe-link status="primary">《用户协议》</vxe-link>
      </template>
      <template #submitAction>
        <vxe-button type="submit" status="primary" style="width: 100%;">点击注册</vxe-button>
      </template>
      <template #otherAction>
        <vxe-row>
          <vxe-col span="12"></vxe-col>
          <vxe-col span="12" align="right">
            <span style="margin-left: 16px;">已有账号？</span>
            <vxe-link status="primary" :router-link="{ name: 'LoginView' }">立即登录</vxe-link>
          </vxe-col>
        </vxe-row>
      </template>
    </vxe-form>

    <UserAgreement ref="agreementRef"></UserAgreement>
  </div>
</template>

<script>
import { postPubAdminLoginRegister } from '@/api/login'
import UserAgreement from './UserAgreement.vue'

export default {
  components: {
    UserAgreement
  },
  data () {
    const formOptions = {
      titleWidth: 100,
      titleColon: true,
      titleAlign: 'right',
      vertical: true,
      loading: false,
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
        { field: 'name', title: '用户名', span: 24, itemRender: { name: 'VxeInput', props: { placeholder: '用户名由 4-14 位字母/数字组成', prefixIcon: 'vxe-icon-user-fill' } } },
        { field: 'password', title: '密码', span: 24, itemRender: { name: 'VxePasswordInput', props: { placeholder: '密码由 4-18 位字母/数字/特殊字符组成', autoComplete: 'new-password', prefixIcon: 'vxe-icon-lock-fill' } } },
        { field: 'confirmPassword', title: '确认密码', span: 24, itemRender: { name: 'VxePasswordInput', props: { placeholder: '请再次输入密码', autoComplete: 'new-password', prefixIcon: 'vxe-icon-lock-fill' } } },
        { field: 'email', title: '邮箱', span: 24, itemRender: { name: 'VxeInput', props: { placeholder: '请输入邮箱', prefixIcon: 'vxe-icon-envelope-fill' } } },
        { span: 24, slots: { default: 'privacyAction' } },
        { span: 24, slots: { default: 'submitAction' } },
        { span: 24, slots: { default: 'otherAction' } }
      ]
    }

    const allowAgreement = false

    return {
      allowAgreement,
      formOptions
    }
  },
  methods: {
    submitEvent () {
      this.formOptions.loading = true
      postPubAdminLoginRegister(this.formOptions.data).then(() => {
        this.formOptions.loading = false
      }).catch(() => {
        this.formOptions.loading = false
      })
    }
  }
}
</script>
