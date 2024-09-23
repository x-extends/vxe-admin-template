<template>
  <PageView>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </PageView>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { VxeGridProps, VxeColumnPropTypes } from 'vxe-table'
import { VxeFormItemPropTypes } from 'vxe-pc-ui'
import { LogVO, getPubAdminLogListPage } from '@/api/log'
import { getPubAdminDictDataConfig } from '@/api/dict'

const typeItemRender = reactive<VxeFormItemPropTypes.ItemRender>({
  name: 'VxeSelect',
  props: {
    clearable: true
  },
  options: [
    { value: 'api', label: '服务日志' },
    { value: 'system', label: '系统日志' }
  ]
})

const typeCellRender = reactive<VxeColumnPropTypes.EditRender>({
  name: 'VxeSelect',
  props: {
    readonly: true,
    clearable: true
  },
  options: [
    { value: 'api', label: '服务日志' },
    { value: 'system', label: '系统日志' }
  ]
})

getPubAdminDictDataConfig({ code: 'LOG_TYPE' }).then(res => {
  typeItemRender.options = res.data
  typeCellRender.options = res.data
})

const statusItemRender = reactive<VxeFormItemPropTypes.ItemRender>({
  name: 'VxeSelect',
  options: [
    { value: 'success', label: '正常' },
    { value: 'error', label: '错误' }
  ]
})

const statusCellRender = reactive<VxeColumnPropTypes.EditRender>({
  name: 'VxeSelect',
  props: {
    readonly: true,
    clearable: true
  },
  options: [
    { value: 'success', label: '正常' },
    { value: 'error', label: '错误' }
  ]
})

getPubAdminDictDataConfig({ code: 'LOG_STATUS' }).then(res => {
  statusItemRender.options = res.data
  statusCellRender.options = res.data
})

const gridOptions = reactive<VxeGridProps<LogVO>>({
  id: 'LogManageList',
  height: '100%',
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
    zoom: true
  },
  formConfig: {
    titleWidth: 80,
    titleAlign: 'right',
    items: [
      { field: 'content', title: '日志内容', span: 6, itemRender: { name: 'VxeInput', props: { clearable: true } } },
      { field: 'createBy', title: '操作人', span: 6, itemRender: { name: 'VxeInput', props: { clearable: true } } },
      { field: 'startDate', title: '开始时间', span: 6, itemRender: { name: 'VxeDatePicker', props: { clearable: true } } },
      { field: 'endDate', title: '结束时间', span: 6, itemRender: { name: 'VxeDatePicker', props: { clearable: true } } },
      { field: 'type', title: '日志类型', span: 6, folding: true, itemRender: typeItemRender },
      { field: 'status', title: '日志状态', span: 6, folding: true, itemRender: statusItemRender },
      { span: 24, align: 'center', collapseNode: true, itemRender: { name: 'ListSearchBtn' } }
    ]
  },
  pagerConfig: {},
  columns: [
    { type: 'seq', width: 70 },
    { field: 'content', title: '日志内容', minWidth: 300 },
    { field: 'type', title: '日志类型', sortable: true, width: 120, cellRender: typeCellRender },
    { field: 'status', title: '日志状态', width: 100, cellRender: statusCellRender },
    { field: 'createBy', title: '操作人', width: 160 },
    { field: 'createTime', title: '操作时间', width: 160, formatter: 'FormatDateTime', sortable: true }
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
        return getPubAdminLogListPage(params)
      }
    }
  }
})
</script>
