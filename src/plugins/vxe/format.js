import { VxeUI } from 'vxe-pc-ui'
import XEUtils from 'xe-utils'

VxeUI.formats.add('FormatDateDefault', {
  tableCellFormatMethod ({ cellValue }) {
    return cellValue ? XEUtils.toDateString(cellValue, 'yyyy-MM-dd') : '-'
  }
})

VxeUI.formats.add('FormatDateTime', {
  tableCellFormatMethod ({ cellValue }) {
    return cellValue ? XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss') : '-'
  }
})
