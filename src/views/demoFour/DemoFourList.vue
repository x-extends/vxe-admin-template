<template>
  <PageView>
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents">
      <template #default_name="{ row }">
        <vxe-button v-if="VxeUI.permission.checkVisible('demoThreeActionUpdate')" mode="text" status="primary" @click="openRow(row)">{{ row.name }}</vxe-button>
        <span v-else>{{ row.name }}</span>
      </template>

      <template #action="{ row }">
        <vxe-button mode="text" status="primary" icon="vxe-icon-edit"  permission-code="demoThreeActionUpdate" @click="editRow(row)">编辑</vxe-button>
        <vxe-button mode="text" status="error" icon="vxe-icon-delete" @click="removeRow(row)" permission-code="demoThreeActionDelete">删除</vxe-button>
      </template>
    </vxe-grid>

    <DetailsDrawer ref="detailsRef" />
    <EditDrawer ref="editRef" @save="saveEvent" @add="addEvent" />
  </PageView>
</template>

<script lang="ts" setup>
import { ref, reactive, ComponentInstance } from 'vue'
import { VxeGridInstance, VxeGridProps, VxeGridListeners } from 'vxe-table'
import { VxeUI } from 'vxe-pc-ui'
import { DemoVO, getPubAdminDemoListPage, postPubAdminDemoSaveBatch, deletePubAdminDemoDelete } from '@/api/demo'
import DetailsDrawer from './components/DetailsDrawer.vue'
import EditDrawer from './components/EditDrawer.vue'

const detailsRef = ref<ComponentInstance<typeof DetailsDrawer>>()
const editRef = ref<ComponentInstance<typeof EditDrawer>>()
const gridRef = ref<VxeGridInstance<DemoVO>>()

const gridOptions = reactive<VxeGridProps<DemoVO>>({
  id: 'DemoFourList',
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
  customConfig: {
    storage: true
  },
  toolbarConfig: {
    refresh: true,
    zoom: true,
    buttons: [
      { name: '新增', code: 'ADD', status: 'primary', icon: 'vxe-icon-add', permissionCode: 'demoThreeActionInsert' },
      { name: '批量删除', code: 'delete', status: 'error', icon: 'vxe-icon-delete', permissionCode: 'demoThreeActionDelete' }
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
    { field: 'name', title: '名称', minWidth: 200, slots: { default: 'default_name' } },
    { field: 'code', title: '编码', sortable: true, width: 200 },
    { field: 'amount', title: '金额', sortable: true, width: 200 },
    { field: 'nickname', title: '昵称', sortable: true, width: 200 },
    { field: 'commenceDate', title: '开工日期', formatter: 'FormatDateDefault', width: 200 },
    { field: 'describe', title: '描述', width: 200 },
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
      delete ({ body }) {
        return postPubAdminDemoSaveBatch({
          ...body
        })
      }
    }
  }
})

const gridEvents: VxeGridListeners = {
  toolbarButtonClick ({ code }) {
    switch (code) {
      case 'ADD':
        editRef.value?.add()
        break
    }
  }
}

const openRow = (row: DemoVO) => {
  detailsRef.value?.open(row._id)
}

const editRow = (row: DemoVO) => {
  editRef.value?.edit(row._id)
}

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

const saveEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.commitProxy('query')
  }
}

const addEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.commitProxy('reload')
  }
}
</script>
