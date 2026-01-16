<template>
  <div>
    <div class="login-title">
      <img src="@/assets/logo.png">
      <span>Vxe 管理系统</span>
    </div>
    <div class="login-desc">一个简洁高效、极致流畅的管理系统模板</div>
    <vxe-form v-bind="formOptions" @submit="submitEvent">
      <template #pwdAction>
        <vxe-row>
          <vxe-col span="12">
            <vxe-checkbox v-model="isRememberPassword">记住密码</vxe-checkbox>
          </vxe-col>
          <vxe-col span="12" align="right">
            <vxe-link status="primary">忘记密码？</vxe-link>
          </vxe-col>
        </vxe-row>
      </template>
      <template #submitAction>
        <vxe-button type="submit" status="primary" style="width: 100%;">立即登录</vxe-button>
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
      </template>
    </vxe-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    const formOptions = {
      titleWidth: 100,
      titleColon: true,
      titleAlign: 'right',
      loading: false,
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
        { field: 'name', title: '', span: 24, itemRender: { name: 'VxeInput', props: { prefixIcon: 'vxe-icon-user-fill', placeholder: '请输入用户名' } } },
        { field: 'password', title: '', span: 24, itemRender: { name: 'VxePasswordInput', props: { prefixIcon: 'vxe-icon-lock-fill' } } },
        { span: 24, slots: { default: 'pwdAction' } },
        { span: 24, slots: { default: 'submitAction' } },
        { span: 24, slots: { default: 'otherAction' } }
      ]
    }

    return {
      isRememberPassword: true,
      formOptions
    }
  },
  methods: {
    ...mapActions([
      'loginServer'
    ]),
    submitEvent () {
      this.formOptions.loading = true
      this.loginServer(this.formOptions.data).then(() => {
        this.formOptions.loading = false
        this.$router.push('/')
      }).catch(() => {
        this.formOptions.loading = false
      })
    }
  }
}
</script>
