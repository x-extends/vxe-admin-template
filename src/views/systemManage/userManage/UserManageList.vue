<template>
  <PageView>
    <vxe-grid ref="gridRef" v-bind="gridOptions" @edit-disabled=editDisabledEvent>
      <template #top>
        <vxe-tip status="error" icon="vxe-icon-warning-circle-fill" permission-code="userManageActionInsert">新增用户的初始密码为：<vxe-text click-to-copy>123456</vxe-text></vxe-tip>
      </template>

      <template #editName="{ row }">
        <vxe-input v-model="row.name" :disabled="!!row.code"></vxe-input>
      </template>

      <template #defaultPictureUrl="{ row }">
        <VxeUpload
          singleMode
          urlMode
          v-model="row.pictureUrl"
          :show-button-text="false"
          :show-remove-button="false"
          :image-config="{ width: 40, height: 40 }"
          :readonly="userRoleLevel >= row.roleLevel || VxeUI.permission.checkVisible('userManageActionInsert|userManageActionUpdate')"
          mode="image"
          button-icon="vxe-icon-edit">
        </VxeUpload>
      </template>

      <template #action="{ row }">
        <vxe-button v-if="userRoleLevel < row.roleLevel" mode="text" status="error" icon="vxe-icon-delete"
          permission-code="userManageActionDelete" @click="removeRow(row)"></vxe-button>
      </template>
    </vxe-grid>
  </PageView>
</template>

<script>
import { VxeUI } from 'vxe-pc-ui'
import { mapGetters } from 'vuex'
import { getPubAdminUserListPage, deletePubAdminUserDelete, postPubAdminUserSaveBatch } from '@/api/user'
import { getPubAdminRoleOptions } from '@/api/role'

export default {
  data () {
    const roleCodeEditRender = {
      name: 'VxeSelect',
      options: [],
      defaultValue: 'default',
      props: {
        disabled: true
      }
    }

    const roleCodesEditRender = {
      name: 'VxeSelect',
      props: {
        multiple: true
      },
      options: [],
      defaultValue: [
        'default'
      ],
      events: {
        change ({ row }) {
          if (!row.roleCodes.includes(row.roleCode)) {
            row.roleCode = row.roleCodes[0]
          }
        }
      }
    }

    const roleCodeItemRender = {
      name: 'VxeSelect',
      props: {
        clearable: true
      },
      options: []
    }

    const roleCodesItemRender = {
      name: 'VxeSelect',
      props: {
        multiple: true,
        clearable: true
      },
      options: []
    }

    const gridOptions = {
      id: 'UserManageList',
      height: '100%',
      keepSource: true,
      showOverflow: true,
      customConfig: {
        storage: true
      },
      rowConfig: {
        isHover: true,
        keyField: '_id'
      },
      sortConfig: {
        remote: true,
        multiple: true
      },
      editConfig: {
        mode: 'row',
        showStatus: true,
        enabled: VxeUI.permission.checkVisible('userManageActionInsert|userManageActionUpdate'),
        beforeEditMethod: ({ row, column }) => {
          if (this.userRoleLevel >= row.roleLevel) {
            return false
          }
          if (row.code && column.field === 'name') {
            return false
          }
          return true
        }
      },
      checkboxConfig: {
        checkMethod: ({ row }) => {
          return this.userRoleLevel < row.roleLevel
        }
      },
      toolbarConfig: {
        refresh: true,
        zoom: true,
        buttons: [
          { name: '新增', code: 'insert_edit', status: 'primary', icon: 'vxe-icon-add', permissionCode: 'userManageActionInsert' },
          { name: '标记/删除', code: 'mark_cancel', status: 'error', icon: 'vxe-icon-delete', permissionCode: 'userManageActionDelete' },
          { name: '保存', code: 'save', status: 'success', icon: 'vxe-icon-save', permissionCode: 'userManageActionInsert|userManageActionDelete|userManageActionUpdate' }
        ]
      },
      editRules: {
        name: [
          { required: true, message: '请输入用户名' }
        ],
        roleCodes: [
          { required: true, type: 'array', message: '至少需要授权一个角色' }
        ]
      },
      formConfig: {
        titleWidth: 80,
        titleAlign: 'right',
        items: [
          { field: 'name', title: '用户名', span: 6, itemRender: { name: 'VxeInput', props: { clearable: true } } },
          { field: 'nickname', title: '昵称', span: 6, itemRender: { name: 'VxeInput', props: { clearable: true } } },
          { field: 'email', title: '邮箱', span: 6, itemRender: { name: 'VxeInput', props: { clearable: true } } },
          { field: 'roleCodes', title: '关联角色', span: 6, itemRender: roleCodesItemRender },
          { field: 'roleCode', title: '默认角色', span: 6, folding: true, itemRender: roleCodeItemRender },
          { field: 'startDate', title: '开始时间', span: 6, folding: true, itemRender: { name: 'VxeDatePicker', props: { clearable: true } } },
          { field: 'endDate', title: '结束时间', span: 6, folding: true, itemRender: { name: 'VxeDatePicker', props: { clearable: true } } },
          { span: 24, align: 'center', collapseNode: true, itemRender: { name: 'ListSearchBtn' } }
        ]
      },
      pagerConfig: {},
      columns: [
        { type: 'checkbox', width: 60 },
        { type: 'seq', width: 70 },
        { field: 'code', title: '用户编码', width: 300, visible: false },
        { field: 'name', title: '用户名', minWidth: 160, sortable: true, editRender: { name: 'VxeInput' }, slots: { edit: 'editName' } },
        { field: 'roleCodes', title: '关联角色', minWidth: 300, editRender: roleCodesEditRender },
        { field: 'roleCode', title: '默认角色', width: 140, editRender: roleCodeEditRender },
        { field: 'nickname', title: '昵称', minWidth: 220, editRender: { name: 'VxeInput' } },
        { field: 'pictureUrl', title: '头像', width: 120, slots: { default: 'defaultPictureUrl' } },
        { field: 'email', title: '邮箱', minWidth: 220, editRender: { name: 'VxeInput' } },
        { field: 'createTime', title: '注册时间', width: 160, formatter: 'FormatDateTime', sortable: true },
        { field: 'updateTime', title: '最后更新时间', width: 160, formatter: 'FormatDateTime', sortable: true },
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
              roleCodes: form.roleCodes ? form.roleCodes.join(',') : '',
              orderBy: sorts.map(item => `${item.field}|${item.order}`).join(',')
            }
            return getPubAdminUserListPage(params)
          },
          save ({ body }) {
            return postPubAdminUserSaveBatch(body)
          }
        }
      }
    }

    return {
      VxeUI,
      roleCodeEditRender,
      roleCodesEditRender,
      roleCodeItemRender,
      roleCodesItemRender,
      gridOptions
    }
  },
  computed: {
    ...mapGetters([
      'userRoleLevel'
    ])
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
        deletePubAdminUserDelete({ _id: row._id }).then(() => {
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
    editDisabledEvent ({ row }) {
      if (this.userRoleLevel >= row.roleLevel) {
        VxeUI.modal.message({
          id: 'noPermissionEdit',
          content: '无法编辑，权限不够！',
          status: 'warning'
        })
      }
    }
  },
  created () {
    getPubAdminRoleOptions().then(res => {
      this.roleCodeEditRender.options = res.data
      this.roleCodesEditRender.options = res.data
      this.roleCodeItemRender.options = res.data
      this.roleCodesItemRender.options = res.data
    })
  }
}
</script>
