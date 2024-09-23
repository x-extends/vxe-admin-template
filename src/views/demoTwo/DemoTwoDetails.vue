<template>
   <PageView :loading="loading">
     <vxe-form v-bind="formOptions"></vxe-form>
   </PageView>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { VxeFormProps } from 'vxe-pc-ui'
import { DemoVO, getPubAdminDemoDetail } from '@/api/demo'

const route = useRoute()

const loading = ref(false)
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
    { field: 'describe', title: '描述', span: 24 },
    { span: 24, align: 'right', itemRender: { name: 'DetailsBackBtn' } }
  ]
})

const loadDetailInfo = async () => {
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

watch(() => route.query.id, () => {
  loadDetailInfo()
})

if (route.query.id) {
  loadDetailInfo()
}
</script>
