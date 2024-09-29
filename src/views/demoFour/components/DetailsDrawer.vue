<template>
  <vxe-drawer
   show-footer
   show-confirm-button
   destroy-on-close
   confirm-button-text="关闭"
   width="60vw"
   v-model="showPopup"
   title="详情"
   :loading="loading">
   <vxe-form ref="formRef" v-bind="formOptions"></vxe-form>
  </vxe-drawer>
</template>

<script>
import { getPubAdminDemoDetail } from '@/api/demo'

export default {
  data () {
    const formOptions = {
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
    }

    return {
      showPopup: false,
      loading: false,
      detailId: '',
      formOptions
    }
  },
  methods: {
    async loadDetailInfo () {
      this.loading = true
      this.formOptions.data = null
      try {
        const res = await getPubAdminDemoDetail({
          id: this.detailId
        })
        const info = res.data
        this.formOptions.data = info
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    open (id) {
      this.detailId = id
      this.showPopup = true
      this.loadDetailInfo()
    }
  }
}
</script>
