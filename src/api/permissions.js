import { requestAjax } from './http'

export function getPubAdminPermissionsListAll (params) {
  return requestAjax({
    url: '/api/pub/admin/permissions/list/all',
    method: 'get',
    params
  })
}

export function postPubAdminPermissionsSaveBatch (data) {
  return requestAjax({
    url: '/api/pub/admin/permissions/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminPermissionsDelete (data) {
  return requestAjax({
    url: '/api/pub/admin/permissions/delete',
    method: 'delete',
    data
  })
}
