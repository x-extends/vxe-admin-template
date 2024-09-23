<template>
  <PageView>
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #action="{ row }">
        <vxe-link status="primary" icon="vxe-icon-association-form" :router-link="{ name: 'DemoOneDetails', query: { id: row._id } }" permission-code="DemoOneDetails">详情</vxe-link>
        <vxe-button mode="text" status="error" icon="vxe-icon-delete" @click="removeRow(row)" permission-code="demoOneActionDelete">删除</vxe-button>
      </template>
    </vxe-grid>
  </PageView>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeGridInstance, VxeGridProps } from 'vxe-table'
import { VxeUI } from 'vxe-pc-ui'
import { DemoVO, getPubAdminDemoListPage, postPubAdminDemoSaveBatch, deletePubAdminDemoDelete } from '@/api/demo'

const gridRef = ref<VxeGridInstance<DemoVO>>()

const gridOptions = reactive<VxeGridProps<DemoVO>>({
  id: 'DemoOneList',
  height: '100%',
  keepSource: true,
  showOverflow: true,
  rowConfig: {
    isHover: true
  },
  sortConfig: {
    remote: true,
    multiple: true
  },
  editConfig: {
    mode: 'row',
    showStatus: true,
    enabled: VxeUI.permission.checkVisible('demoOneActionInsert|demoOneActionUpdate')
  },
  editRules: {
    name: [
      { required: true, message: '请输入名称' }
    ]
  },
  customConfig: {
    storage: true
  },
  toolbarConfig: {
    refresh: true,
    zoom: true,
    buttons: [
      { name: '新增', code: 'insert_edit', status: 'primary', icon: 'vxe-icon-add', permissionCode: 'demoOneActionInsert' },
      { name: '标记/删除', code: 'mark_cancel', status: 'error', icon: 'vxe-icon-delete', permissionCode: 'demoOneActionDelete' },
      { name: '保存', code: 'save', status: 'success', icon: 'vxe-icon-save', permissionCode: 'demoOneActionInsert|demoOneActionDelete|demoOneActionUpdate' }
    ]
  },
  formConfig: {
    titleWidth: 80,
    titleAlign: 'right',
    items: [
      { field: 'name', title: '名称', span: 6, itemRender: { name: 'VxeInput' } },
      { field: 'nickname', title: '昵称', span: 6, itemRender: { name: 'VxeInput' } },
      { field: 'code', title: '编码', span: 6, itemRender: { name: 'VxeInput' } },
      { field: 'amount', title: '金额', span: 6, itemRender: { name: 'VxeNumberInput' } },
      { field: 'startDate', title: '开始时间', span: 6, folding: true, itemRender: { name: 'VxeDatePicker', props: { clearable: true } } },
      { field: 'endDate', title: '结束时间', span: 6, folding: true, itemRender: { name: 'VxeDatePicker', props: { clearable: true } } },
      { span: 24, align: 'center', collapseNode: true, itemRender: { name: 'ListSearchBtn' } }
    ]
  },
  pagerConfig: {},
  columns: [
    { type: 'checkbox', width: 60 },
    { type: 'seq', width: 70 },
    { field: 'name', title: '名称', minWidth: 200, editRender: { name: 'VxeInput' } },
    { field: 'code', title: '编码', sortable: true, width: 200, editRender: { name: 'VxeInput' } },
    { field: 'amount', title: '金额', sortable: true, width: 200, editRender: { name: 'VxeNumberInput' } },
    { field: 'nickname', title: '昵称', sortable: true, width: 200, editRender: { name: 'VxeInput' } },
    { field: 'commenceDate', title: '开工日期', width: 200, editRender: { name: 'VxeDatePicker' } },
    { field: 'describe', title: '描述', width: 200, editRender: { name: 'VxeInput' } },
    { field: 'updateTime', title: '最后更新时间', width: 160, formatter: 'FormatDateTime', sortable: true },
    { field: 'createTime', title: '创建时间', width: 160, formatter: 'FormatDateTime', sortable: true },
    { field: 'action', title: '操作', fixed: 'right', width: 160, slots: { default: 'action' } }
  ],
  proxyConfig: {
    form: true,
    sort: true,
    ajax: {
      query ({ page, form, sorts }) {
        const params = {
          ...page,
          ...form,
          orderBy: sorts.map(item => `${item.field}|${item.order}`).join(',')
        }
        return getPubAdminDemoListPage(params)
      },
      save ({ body }) {
        return postPubAdminDemoSaveBatch({
          ...body
        })
      }
    }
  }
})

const removeRow = async (row: DemoVO) => {
  const $grid = gridRef.value
  if ($grid && $grid.isInsertByRow(row)) {
    $grid.remove(row)
    return
  }
  const type = await VxeUI.modal.confirm({
    content: `请确认是否删除 “ ${row.name} ”？`
  })
  if (type === 'confirm') {
    deletePubAdminDemoDelete({ _id: row._id }).then(() => {
      if ($grid) {
        $grid.commitProxy('query')
      }
      VxeUI.modal.message({
        content: '删除成功',
        status: 'success'
      })
    })
  }
}
</script>
