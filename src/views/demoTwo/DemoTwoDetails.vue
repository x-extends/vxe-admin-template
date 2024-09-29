<template>
   <PageView :loading="loading">
     <vxe-form v-bind="formOptions"></vxe-form>
   </PageView>
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
        { field: 'describe', title: '描述', span: 24 },
        { span: 24, align: 'right', itemRender: { name: 'DetailsBackBtn' } }
      ]
    }

    return {
      loading: false,
      formOptions
    }
  },
  methods: {
    async loadDetailInfo () {
      this.loading = true
      this.formOptions.data = null
      try {
        const res = await getPubAdminDemoDetail({
          id: this.$route.query.id
        })
        const info = res.data
        this.formOptions.data = info
      } catch (e) {
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    '$route.query.id' () {
      this.loadDetailInfo()
    }
  },
  created () {
    if (this.$route.query.id) {
      this.loadDetailInfo()
    }
  }
}

</script>
