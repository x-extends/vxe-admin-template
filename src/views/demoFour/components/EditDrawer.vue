<template>
   <vxe-drawer
    show-footer
    destroy-on-close
    v-model="showPopup"
    width="60vw"
    :title="detailId ? '编辑' : '新增'"
    :loading="loading">
    <vxe-form ref="formRef" v-bind="formOptions"></vxe-form>

    <template #footer>
      <vxe-button @click="cancelEvent">取消</vxe-button>
      <vxe-button type="reset" icon="vxe-icon-repeat" :disabled="loading">重置</vxe-button>
      <vxe-button type="submit" status="primary" icon="vxe-icon-search" :disabled="loading" @click="saveEvent">保存</vxe-button>
    </template>
   </vxe-drawer>
</template>

<script>
import { VxeUI } from 'vxe-pc-ui'
import { getPubAdminDemoDetail, postPubAdminDemoSaveInfo } from '@/api/demo'
import XEUtils from 'xe-utils'

const defaultData = {
  _id: '',
  name: '',
  nickname: '',
  code: '',
  amount: null,
  commenceDate: '',
  describe: ''
}

export default {
  data () {
    const formOptions = {
      titleWidth: 80,
      titleColon: true,
      titleAlign: 'right',
      data: XEUtils.clone(defaultData, true),
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
        { field: 'describe', title: '描述', span: 24, itemRender: { name: 'VxeTextarea' } }
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
    cancelEvent () {
      this.showPopup = false
    },
    async saveEvent () {
      this.loading = true
      try {
        await postPubAdminDemoSaveInfo({
          ...this.formOptions.data,
          _id: this.detailId
        })
        VxeUI.modal.message({
          content: '保存成功',
          status: 'success'
        })
        this.showPopup = false
        this.$emit(this.detailId ? 'save' : 'add')
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    add () {
      this.detailId = ''
      this.showPopup = true
      this.formOptions.data = XEUtils.clone(defaultData, true)
    },
    edit (id) {
      this.detailId = id
      this.showPopup = true
      this.formOptions.data = XEUtils.clone(defaultData, true)
      this.loadDetailInfo()
    }
  }
}
</script>
