<template>
  <PageView>
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #action="{ row }">
        <vxe-button mode="text" status="error" icon="vxe-icon-delete" permission-code="permissionsManageActionDelete"
          @click="removeRow(row)"></vxe-button>
      </template>
    </vxe-grid>
  </PageView>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeGridProps, VxeGridInstance, VxeColumnPropTypes } from 'vxe-table'
import { VxeUI, VxeTreeSelectProps } from 'vxe-pc-ui'
import { PermissionsVO, getPubAdminPermissionsListAll, postPubAdminPermissionsSaveBatch, deletePubAdminPermissionsDelete } from '@/api/permissions'
import { getPubAdminRouteListAll } from '@/api/route'

const gridRef = ref<VxeGridInstance<PermissionsVO>>()

const routeCodesEditRender = reactive<VxeColumnPropTypes.EditRender<PermissionsVO, VxeTreeSelectProps>>({
  name: 'VxeTreeSelect',
  options: [],
  optionProps: {
    value: 'code',
    label: 'name'
  },
  props: {
    multiple: true,
    clearable: true,
    treeConfig: {
      transform: true,
      keyField: 'code',
      parentField: 'parentCode',
      showCheckbox: true,
      checkboxConfig: {
        checkStrictly: true
      }
    }
  }
})

getPubAdminRouteListAll({}).then(res => {
  routeCodesEditRender.options = res.data
})

const gridOptions = reactive<VxeGridProps<PermissionsVO>>({
  id: 'PermissionsManageList',
  height: '100%',
  keepSource: true,
  showOverflow: true,
  rowConfig: {
    isHover: true
  },
  treeConfig: {
    transform: true,
    rowField: 'code',
    parentField: 'parentCode',
    expandAll: true
  },
  editConfig: {
    mode: 'row',
    showStatus: true,
    enabled: VxeUI.permission.checkVisible('permissionsManageActionInsert|permissionsManageActionUpdate')
  },
  customConfig: {
    storage: true
  },
  toolbarConfig: {
    refresh: true,
    zoom: true,
    buttons: [
      { name: '新增', code: 'insert_edit', status: 'primary', icon: 'vxe-icon-add', permissionCode: 'permissionsManageActionInsert' },
      { name: '标记/删除', code: 'mark_cancel', status: 'error', icon: 'vxe-icon-delete', permissionCode: 'permissionsManageActionDelete' },
      { name: '保存', code: 'save', status: 'success', icon: 'vxe-icon-save', permissionCode: 'permissionsManageActionInsert|permissionsManageActionDelete|permissionsManageActionUpdate' }
    ]
  },
  editRules: {
    name: [
      { required: true, message: '请输入权限名称' }
    ]
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { type: 'seq', width: 70 },
    { field: 'code', title: '权限编码', width: 300, visible: false },
    { field: 'name', title: '权限名称', treeNode: true, minWidth: 300, editRender: { name: 'VxeInput' } },
    { field: 'routeCodes', title: '关联路由', minWidth: 500, editRender: routeCodesEditRender },
    { field: 'updateTime', title: '最后更新时间', width: 160, formatter: 'FormatDateTime' },
    { field: 'createTime', title: '创建时间', width: 160, formatter: 'FormatDateTime' },
    { field: 'action', title: '操作', fixed: 'right', width: 80, slots: { default: 'action' } }
  ],
  proxyConfig: {
    ajax: {
      query ({ page }) {
        const params = {
          ...page
        }
        return getPubAdminPermissionsListAll(params)
      },
      save ({ body }) {
        return postPubAdminPermissionsSaveBatch(body)
      }
    }
  }
})

const removeRow = async (row: PermissionsVO) => {
  const $grid = gridRef.value
  if ($grid && $grid.isInsertByRow(row)) {
    $grid.remove(row)
    return
  }
  const type = await VxeUI.modal.confirm({
    content: `请确认是否删除 “ ${row.name} ”？`
  })
  if (type === 'confirm') {
    deletePubAdminPermissionsDelete({ _id: row._id }).then(() => {
      const $grid = gridRef.value
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
