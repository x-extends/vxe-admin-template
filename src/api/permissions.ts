import { requestAjax } from './http'

export interface PermissionsVO {
  _id: string
  name: string
  code: string
}

export function getPubAdminPermissionsListAll (params?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/permissions/list/all',
    method: 'get',
    params
  })
}

export function postPubAdminPermissionsSaveBatch (data?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/permissions/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminPermissionsDelete (data?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/permissions/delete',
    method: 'delete',
    data
  })
}
