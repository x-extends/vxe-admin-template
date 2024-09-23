<template>
   <PageView :loading="loading">
     <vxe-form v-bind="formOptions" @submit="saveEvent"></vxe-form>
   </PageView>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { VxeUI, VxeFormProps } from 'vxe-pc-ui'
import { DemoVO, getPubAdminDemoDetail, postPubAdminDemoSaveInfo } from '@/api/demo'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const formOptions = reactive<VxeFormProps<DemoVO | null>>({
  titleWidth: 80,
  titleColon: true,
  titleAlign: 'right',
  data: {
    _id: '',
    name: '',
    nickname: '',
    code: '',
    amount: null,
    commenceDate: '',
    describe: ''
  },
  rules: {
    name: [
      { required: true, message: '请输入名称' }
    ]
  },
  items: [
    { field: 'name', title: '名称', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'code', title: '编码', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'nickname', title: '昵称', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'amount', title: '金额', span: 12, itemRender: { name: 'VxeNumberInput' } },
    { field: 'commenceDate', title: '开工时间', span: 12, itemRender: { name: 'VxeDatePicker' } },
    { field: 'describe', title: '描述', span: 24, itemRender: { name: 'VxeTextarea' } },
    { align: 'center', span: 24, itemRender: { name: 'EditSubmitBtn' } }
  ]
})

const loadFormSettingConfig = async () => {
  loading.value = true
  formOptions.data = null
  try {
    const res = await getPubAdminDemoDetail({
      id: route.query.id
    })
    const info: DemoVO = res.data
    formOptions.data = info
  } catch (e) {
  } finally {
    loading.value = false
  }
}

const saveEvent = async () => {
  loading.value = true
  try {
    await postPubAdminDemoSaveInfo({
      ...formOptions.data,
      _id: route.query.id || ''
    })
    VxeUI.modal.message({
      content: '保存成功',
      status: 'success'
    })
    router.back()
  } catch (e) {
  } finally {
    loading.value = false
  }
}

watch(() => route.query.id, () => {
  loadFormSettingConfig()
})

if (route.query.id) {
  loadFormSettingConfig()
}
</script>
