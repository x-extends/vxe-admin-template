import { requestAjax } from './http'

export function postPubAdminUploadSingle (data, options) {
  return requestAjax({
    url: '/api/pub/admin/upload/single',
    method: 'post',
    data,
    ...options
  })
}
