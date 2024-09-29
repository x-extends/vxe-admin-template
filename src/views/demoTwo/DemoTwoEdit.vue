<template>
   <PageView :loading="loading">
     <vxe-form v-bind="formOptions" @submit="saveEvent"></vxe-form>
   </PageView>
</template>

<script>
import { VxeUI } from 'vxe-pc-ui'
import { getPubAdminDemoDetail, postPubAdminDemoSaveInfo } from '@/api/demo'

export default {
  data () {
    const formOptions = {
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
    }

    return {
      loading: false,
      formOptions
    }
  },
  methods: {
    async loadFormSettingConfig () {
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
    },
    async saveEvent () {
      this.loading = true
      try {
        await postPubAdminDemoSaveInfo({
          ...this.formOptions.data,
          _id: this.$route.query.id || ''
        })
        VxeUI.modal.message({
          content: '保存成功',
          status: 'success'
        })
        this.$router.back()
      } catch (e) {
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    '$route.query.id' () {
      this.loadFormSettingConfig()
    }
  },
  created () {
    if (this.$route.query.id) {
      this.loadFormSettingConfig()
    }
  }
}
</script>
