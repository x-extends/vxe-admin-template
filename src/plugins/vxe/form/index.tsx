import { VxeUI } from 'vxe-pc-ui'
import router from '@/router'

/**
 * 列表查询操作按钮
 */
VxeUI.renderer.add('ListSearchBtn', {
  renderFormItemContent () {
    return <span>
      <vxe-button type="submit" status="primary" icon="vxe-icon-search">查询</vxe-button>
      <vxe-button type="reset" icon="vxe-icon-repeat">重置</vxe-button>
    </span>
  }
})

/**
 * 详情返回按钮
 */
VxeUI.renderer.add('DetailsBackBtn', {
  renderFormItemContent () {
    return <vxe-button
    onClick={
      () => {
        router.back()
      }
    }>返回</vxe-button>
  }
})

/**
 * 表单提交操作按钮
 */
VxeUI.renderer.add('EditSubmitBtn', {
  renderFormItemContent () {
    return <span>
      <vxe-button
        onClick={
          () => {
            router.back()
          }
        }>取消</vxe-button>
      <vxe-button type="reset" icon="vxe-icon-repeat">重置</vxe-button>
      <vxe-button type="submit" status="primary" icon="vxe-icon-search">保存</vxe-button>
    </span>
  }
})
