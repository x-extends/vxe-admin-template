<template>
  <PageView>
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #action="{ row }">
        <vxe-button mode="text" status="error" icon="vxe-icon-delete" permission-code="dictManageActionDelete" @click="removeRow(row)"></vxe-button>
      </template>
    </vxe-grid>
  </PageView>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { VxeGridInstance, VxeGridProps } from 'vxe-table'
import { VxeUI } from 'vxe-pc-ui'
import { DictVO, getPubAdminDictDataListPage, postPubAdminDictDataSaveBatch, deletePubAdminDictDataDelete } from '@/api/dict'

const route = useRoute()

const gridRef = ref<VxeGridInstance<DictVO>>()

const gridOptions = reactive<VxeGridProps<DictVO>>({
  id: 'DictDataList',
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
    enabled: VxeUI.permission.checkVisible('dictManageActionInsert|dictManageActionUpdate')
  },
  customConfig: {
    storage: true
  },
  toolbarConfig: {
    refresh: true,
    zoom: true,
    buttons: [
      { name: '新增', code: 'insert_edit', status: 'primary', icon: 'vxe-icon-add', permissionCode: 'dictManageActionInsert' },
      { name: '标记/删除', code: 'mark_cancel', status: 'error', icon: 'vxe-icon-delete', permissionCode: 'dictManageActionDelete' },
      { name: '保存', code: 'save', status: 'success', icon: 'vxe-icon-save', permissionCode: 'dictManageActionInsert|dictManageActionDelete|dictManageActionUpdate' }
    ]
  },
  formConfig: {
    titleWidth: 80,
    titleAlign: 'right',
    items: [
      { field: 'name', title: '值', span: 6, itemRender: { name: 'VxeInput' } },
      { field: 'code', title: '内容', span: 6, itemRender: { name: 'VxeInput' } },
      {
        itemRender: {
          name: 'VxeButtonGroup',
          options: [
            { type: 'submit', content: '查询', status: 'primary', icon: 'vxe-icon-search' },
            { type: 'reset', content: '重置', icon: 'vxe-icon-repeat' }
          ]
        }
      }
    ]
  },
  pagerConfig: {},
  columns: [
    { type: 'checkbox', width: 60 },
    { type: 'seq', width: 70 },
    { field: 'code', title: '值', sortable: true, width: 200, editRender: { name: 'VxeInput' } },
    { field: 'name', title: '内容', minWidth: 200, editRender: { name: 'VxeInput' } },
    { field: 'updateTime', title: '最后更新时间', width: 160, formatter: 'FormatDateTime', sortable: true },
    { field: 'createTime', title: '创建时间', width: 160, formatter: 'FormatDateTime', sortable: true },
    { field: 'action', title: '操作', fixed: 'right', width: 80, slots: { default: 'action' } }
  ],
  proxyConfig: {
    form: true,
    sort: true,
    ajax: {
      query ({ page, form, sorts }) {
        const params = {
          ...page,
          ...form,
          pId: route.query.pId,
          orderBy: sorts.map(item => `${item.field}|${item.order}`).join(',')
        }
        return getPubAdminDictDataListPage(params)
      },
      save ({ body }) {
        return postPubAdminDictDataSaveBatch({
          ...body,
          pId: route.query.pId
        })
      }
    }
  }
})

const removeRow = async (row: DictVO) => {
  const $grid = gridRef.value
  if ($grid && $grid.isInsertByRow(row)) {
    $grid.remove(row)
    return
  }
  const type = await VxeUI.modal.confirm({
    content: `该操作将会同时删除对应的配置项，请确认是否删除 “ ${row.name} ”？`
  })
  if (type === 'confirm') {
    deletePubAdminDictDataDelete({ _id: row._id }).then(() => {
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
