<template>
  <PageView>
    <vxe-grid ref="gridRef" v-bind="gridOptions" @edit-disabled=editDisabledEvent>
      <template #action="{ row }">
        <vxe-button v-if="userRoleLevel < row.level" mode="text" status="error" icon="vxe-icon-delete"
          permission-code="roleManageActionDelete" @click="removeRow(row)"></vxe-button>
      </template>
    </vxe-grid>
  </PageView>
</template>

<script>
import { mapGetters } from 'vuex'
import { VxeUI } from 'vxe-pc-ui'
import { getPubAdminRoleListPage, postPubAdminRoleSaveBatch, deletePubAdminRoleDelete } from '@/api/role'
import { getPubAdminPermissionsListAll } from '@/api/permissions'

export default {
  data () {
    const minLevel = this.userRoleLevel + 1
    const levelEditRender = {
      name: 'VxeNumberInput',
      defaultValue: minLevel,
      props: {
        min: minLevel,
        max: 999
      }
    }

    const permissionsCodesEditRender = {
      name: 'VxeTreeSelect',
      options: [],
      optionProps: {
        value: 'code',
        label: 'name'
      },
      props: {
        multiple: true,
        treeConfig: {
          transform: true,
          keyField: 'code',
          parentField: 'parentCode',
          showCheckbox: true
        }
      }
    }

    const permissionsCodesItemRender = {
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
    }

    const gridOptions = {
      id: 'RoleManageList',
      height: '100%',
      keepSource: true,
      showOverflow: true,
      rowConfig: {
        isHover: true
      },
      customConfig: {
        storage: true
      },
      sortConfig: {
        remote: true,
        multiple: true
      },
      editConfig: {
        mode: 'row',
        showStatus: true,
        enabled: VxeUI.permission.checkVisible('roleManageActionInsert|roleManageActionUpdate'),
        beforeEditMethod: ({ row }) => {
          return this.userRoleLevel < row.level
        }
      },
      checkboxConfig: {
        checkMethod: ({ row }) => {
          return this.userRoleLevel < row.level
        }
      },
      toolbarConfig: {
        refresh: true,
        zoom: true,
        buttons: [
          { name: '新增', code: 'insert_edit', status: 'primary', icon: 'vxe-icon-add', permissionCode: 'roleManageActionInsert' },
          { name: '标记/删除', code: 'mark_cancel', status: 'error', icon: 'vxe-icon-delete', permissionCode: 'roleManageActionDelete' },
          { name: '保存', code: 'save', status: 'success', icon: 'vxe-icon-save', permissionCode: 'roleManageActionInsert|roleManageActionDelete|roleManageActionUpdate' }
        ]
      },
      editRules: {
        name: [
          { required: true, message: '请输入角色名称' }
        ]
      },
      formConfig: {
        items: [
          { field: 'name', title: '角色名称', span: 6, itemRender: { name: 'VxeInput', props: { clearable: true } } },
          { field: 'permissionsCodes', title: '关联权限', span: 6, itemRender: permissionsCodesItemRender },
          { itemRender: { name: 'ListSearchBtn' } }
        ]
      },
      pagerConfig: {},
      columns: [
        { type: 'checkbox', width: 60 },
        { type: 'seq', width: 70 },
        { field: 'code', title: '角色编码', width: 300, visible: false },
        { field: 'name', title: '角色名称', minWidth: 200, sortable: true, editRender: { name: 'VxeInput' } },
        { field: 'level', title: '权重', width: 120, sortable: true, editRender: levelEditRender, titlePrefix: { icon: 'vxe-icon-question-circle-fill', content: '角色权重说明：数值越低权限越高，高权重的角色可以修改低权重的数据。' } },
        { field: 'permissionsCodes', title: '关联权限', minWidth: 500, editRender: permissionsCodesEditRender },
        { field: 'remark', title: '备注', minWidth: 300 },
        { field: 'updateTime', title: '最后更新时间', width: 160, formatter: 'FormatDateTime', sortable: true },
        { field: 'createTime', title: '创建时间', width: 160, formatter: 'FormatDateTime', sortable: true },
        { field: 'action', title: '操作', fixed: 'right', width: 80, slots: { default: 'action' } }
      ],
      proxyConfig: {
        sort: true,
        form: true,
        ajax: {
          query ({ page, form, sorts }) {
            const params = {
              ...page,
              ...form,
              permissionsCodes: form.permissionsCodes ? form.permissionsCodes.join(',') : '',
              orderBy: sorts.map(item => `${item.field}|${item.order}`).join(',')
            }
            return getPubAdminRoleListPage(params)
          },
          save ({ body }) {
            return postPubAdminRoleSaveBatch(body)
          }
        }
      }
    }

    return {
      levelEditRender,
      permissionsCodesEditRender,
      permissionsCodesItemRender,
      gridOptions
    }
  },
  computed: {
    ...mapGetters([
      'userRoleLevel'
    ])
  },
  created () {
    getPubAdminPermissionsListAll({}).then(res => {
      this.permissionsCodesEditRender.options = res.data
      this.permissionsCodesItemRender.options = res.data
    })
  },
  methods: {
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
        deletePubAdminRoleDelete({ _id: row._id }).then(() => {
          if ($grid) {
            $grid.commitProxy('query')
          }
          VxeUI.modal.message({
            content: '删除成功',
            status: 'success'
          })
        })
      }
    },
    editDisabledEvent () {
      VxeUI.modal.message({
        id: 'noPermissionEdit',
        content: '无法编辑，权限不够！',
        status: 'warning'
      })
    }
  }
}
</script>
