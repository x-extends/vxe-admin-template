import { requestAjax } from './http'

export function postPubAdminUploadSingle (data, options) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/upload/single',
    method: 'post',
    data,
    ...options
  })
}
