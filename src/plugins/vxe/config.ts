import { VxeUI } from 'vxe-pc-ui'
import { postPubAdminUploadSingle } from '@/api/upload'
import { useUserStore } from '@/store/user'

// 全局参数
VxeUI.setConfig({
  version: 0,
  zIndex: 999,

  permissionMethod ({ code }) {
    const userStore = useUserStore()
    if (code) {
      const visible = userStore.routePermissionCodeList.includes(code as string)
      return {
        // 是否可视
        visible,
        // 是否禁用
        disabled: false
      }
    }
    return {
      visible: true,
      disabled: false
    }
  },

  table: {
    border: true,
    showOverflow: true,
    autoResize: true,
    columnConfig: {
      resizable: true
    },
    editConfig: {
      trigger: 'click'
    },
    sortConfig: {
      trigger: 'cell'
    },
    scrollY: {
      enabled: true,
      gt: 20
    }
  },
  grid: {
    toolbarConfig: {
      custom: true
    },
    proxyConfig: {
      showResponseMsg: false,
      showActiveMsg: true,
      response: {
        total: 'page.total',
        result: 'data',
        list: 'data'
      },
      ajax: {
        deleteSuccess () {
          VxeUI.modal.message({
            content: '删除成功',
            status: 'success'
          })
        },
        saveSuccess ({ response }) {
          const { data } = response
          VxeUI.modal.message({
            content: `新增 ${data.insertCount} 条，删除 ${data.deleteCount} 条，修改 ${data.updateCount} 条`,
            status: 'success'
          })
        }
      }
    }
  },
  upload: {
    uploadMethod ({ file, updateProgress }) {
      const formData = new FormData()
      formData.append('file', file)
      return postPubAdminUploadSingle(formData, {
        onUploadProgress (progressEvent) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 0))
          updateProgress(percentCompleted)
        }
      }).then((res) => {
        return {
          ...res.data,
          url: `${import.meta.env.VITE_APP_BASE_API}/myResource/upload/${res.data.id}`
        }
      })
    }
  },
  pager: {
    layouts: ['Home', 'PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'End', 'Sizes', 'Total']
  }
})
