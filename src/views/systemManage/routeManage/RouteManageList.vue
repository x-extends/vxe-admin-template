<template>
  <PageView>
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #action="{ row }">
        <vxe-button mode="text" status="primary" icon="vxe-icon-add-sub" permission-code="routeManageActionInsert" @click="addSubRow(row)"></vxe-button>
        <vxe-button mode="text" status="error" icon="vxe-icon-delete" permission-code="routeManageActionDelete" @click="removeRow(row)"></vxe-button>
      </template>
    </vxe-grid>
  </PageView>
</template>

<script>
import XEUtils from 'xe-utils'
import { VxeUI } from 'vxe-pc-ui'
import { getPubAdminRouteListAll, postPubAdminRouteSaveBatch, deletePubAdminRouteDelete } from '@/api/route'
import { routeConfigs } from '@/router/config'

export default {
  data () {
    const routeCodeList = [
      { value: '', label: '-' }
    ]
    XEUtils.eachTree(routeConfigs, item => {
      if (item.name && item.component) {
        routeCodeList.push({
          label: item.name,
          value: item.name
        })
      }
    })

    const parentCodeEditRender = {
      name: 'VxeTreeSelect',
      options: [],
      optionProps: {
        value: 'code',
        label: 'name'
      },
      props: {
        clearable: true,
        treeConfig: {
          transform: true,
          keyField: 'code',
          parentField: 'parentCode',
          showRadio: true
        }
      }
    }

    const routeNameEditRender = {
      name: 'VxeSelect',
      defaultValue: '',
      options: routeCodeList
    }

    const typeEditRender = {
      name: 'VxeSelect',
      defaultValue: 'menu',
      options: [
        { value: 'menu', label: '菜单' },
        { value: 'action', label: '行为' }
      ]
    }

    const gridOptions = {
      id: 'RouteManageList',
      height: '100%',
      keepSource: true,
      showOverflow: true,
      rowConfig: {
        isHover: true,
        keyField: '_id'
      },
      treeConfig: {
        transform: true,
        rowField: 'code',
        parentField: 'parentCode',
        expandAll: true,
        reserve: true
      },
      editConfig: {
        mode: 'row',
        showStatus: true,
        enabled: VxeUI.permission.checkVisible('routeManageActionInsert|routeManageActionUpdate')
      },
      customConfig: {
        storage: true
      },
      toolbarConfig: {
        refresh: true,
        zoom: true,
        buttons: [
          { name: '新增', code: 'insert_edit', status: 'primary', icon: 'vxe-icon-add', permissionCode: 'routeManageActionInsert' },
          { name: '标记/删除', code: 'mark_cancel', status: 'error', icon: 'vxe-icon-delete', permissionCode: 'routeManageActionDelete' },
          { name: '保存', code: 'save', status: 'success', icon: 'vxe-icon-save', permissionCode: 'routeManageActionInsert|routeManageActionDelete|routeManageActionUpdate' }
        ]
      },
      editRules: {
        type: [
          { required: true, message: '请选择路由类型' }
        ],
        name: [
          { required: true, message: '请输入路由名称' }
        ],
        parentCode: [
          {
            validator ({ row }) {
              if (row.parentCode && row.parentCode === row.code) {
                return new Error('父级不能是自己')
              }
            }
          }
        ]
      },
      columns: [
        { type: 'checkbox', width: 60 },
        { type: 'seq', width: 70 },
        { field: 'name', title: '路由名称', treeNode: true, minWidth: 300, editRender: { name: 'VxeInput' } },
        { field: 'parentCode', title: '关联父级', width: 200, editRender: parentCodeEditRender },
        { field: 'routeName', title: '关联组件', width: 260, editRender: routeNameEditRender },
        { field: 'type', title: '路由类型', width: 120, editRender: typeEditRender },
        { field: 'code', title: '路由编码', width: 200, editRender: { name: 'VxeInput' } },
        { field: 'icon', title: '菜单图标', width: 120, editRender: { name: 'VxeIconPicker' } },
        { field: 'sort', title: '排序', width: 100, editRender: { name: 'VxeNumberInput' } },
        { field: 'updateTime', title: '最后更新时间', width: 160, formatter: 'FormatDateTime' },
        { field: 'createTime', title: '创建时间', width: 160, formatter: 'FormatDateTime' },
        { field: 'action', title: '操作', fixed: 'right', width: 100, slots: { default: 'action' } }
      ],
      proxyConfig: {
        ajax: {
          query ({ page }) {
            const params = {
              ...page
            }
            return getPubAdminRouteListAll(params).then(res => {
              parentCodeEditRender.options = res.data
              return res
            })
          },
          save ({ body }) {
            return postPubAdminRouteSaveBatch(body)
          }
        }
      }
    }

    return {
      routeCodeList,
      parentCodeEditRender,
      routeNameEditRender,
      typeEditRender,
      gridOptions
    }
  },
  methods: {
    async addSubRow (row) {
      const $grid = this.$refs.gridRef
      if ($grid) {
        const { row: newRow } = await $grid.insert({
          name: '',
          parentCode: row.code
        })
        $grid.setEditRow(newRow)
        $grid.setTreeExpand(row, true)
      }
    },
    async removeRow (row) {
      const $grid = this.$refs.gridRef
      if ($grid && $grid.isInsertByRow(row)) {
        $grid.remove(row)
        return
      }
      const type = await VxeUI.modal.confirm({
        content: `请确认是否删除 “ ${row.name} ”？`
      })
      if (type === 'confirm') {
        deletePubAdminRouteDelete({ _id: row._id }).then(() => {
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
  }
}
</script>
