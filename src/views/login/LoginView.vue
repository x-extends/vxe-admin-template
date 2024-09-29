<template>
  <div>
    <div class="login-title">
      <img src="@/assets/logo.png">
      <span>Vxe Admin</span>
    </div>
    <div class="login-desc">一个简洁高效、极致流畅的管理系统模板</div>
    <vxe-form v-bind="formOptions" v-on="formEvents">
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
            <span style="margin-left: 16px;">没有账号？</span>
            <vxe-link status="primary" :router-link="{ name: 'RegisterView' }">点击注册</vxe-link>
          </vxe-col>
        </vxe-row>
      </template>
    </vxe-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { VxeFormProps, VxeFormListeners } from 'vxe-pc-ui'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

interface FormDataVO {
  name: string
  password: string
}

const isRememberPassword = ref(true)

const formOptions = reactive<VxeFormProps<FormDataVO>>({
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
    { field: 'name', title: '', span: 24, itemRender: { name: 'VxeInput' } },
    { field: 'password', title: '', span: 24, itemRender: { name: 'VxeInput', props: { type: 'password' } } },
    { span: 24, slots: { default: 'pwdAction' } },
    { span: 24, slots: { default: 'submitAction' } },
    { span: 24, slots: { default: 'otherAction' } }
  ]
})

const formEvents: VxeFormListeners<FormDataVO> = {
  submit () {
    formOptions.loading = true
    userStore.loginServer(formOptions.data).then(() => {
      formOptions.loading = false
      router.push('/')
    }).catch(() => {
      formOptions.loading = false
    })
  }
}
</script>
