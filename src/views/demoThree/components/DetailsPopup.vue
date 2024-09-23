<template>
  <vxe-modal
   show-footer
   show-confirm-button
   destroy-on-close
   resize
   confirm-button-text="关闭"
   width="70vw"
   height="60vh"
   v-model="showPopup"
   title="详情"
   :loading="loading">
   <vxe-form ref="formRef" v-bind="formOptions"></vxe-form>
  </vxe-modal>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeFormProps } from 'vxe-pc-ui'
import { DemoVO, getPubAdminDemoDetail } from '@/api/demo'

const showPopup = ref(false)
const loading = ref(false)
const detailId = ref('')

const formOptions = reactive<VxeFormProps<DemoVO | null>>({
  titleWidth: 100,
  titleColon: true,
  titleAlign: 'right',
  border: true,
  titleBackground: true,
  data: null,
  items: [
    { field: 'name', title: '名称', span: 12 },
    { field: 'code', title: '编码', span: 12 },
    { field: 'nickname', title: '昵称', span: 12 },
    { field: 'amount', title: '金额', span: 12 },
    { field: 'commenceDate', title: '开工时间', span: 12 },
    { field: 'describe', title: '描述', span: 24 }
  ]
})

const loadDetailInfo = async () => {
  loading.value = true
  formOptions.data = null
  try {
    const res = await getPubAdminDemoDetail({
      id: detailId.value
    })
    const info: DemoVO = res.data
    formOptions.data = info
  } catch (e) {
  } finally {
    loading.value = false
  }
}

defineExpose({
  open (id: string) {
    detailId.value = id
    showPopup.value = true
    loadDetailInfo()
  }
})
</script>
