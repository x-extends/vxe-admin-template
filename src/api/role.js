import { requestAjax } from './http'

export function getPubAdminRoleOptions (params) {
  return requestAjax({
    url: '/api/pub/admin/role/options',
    method: 'get',
    params
  })
}

export function getPubAdminRoleListPage (params) {
  return requestAjax({
    url: `/api/pub/admin/role/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}

export function postPubAdminRoleSaveBatch (data) {
  return requestAjax({
    url: '/api/pub/admin/role/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminRoleDelete (data) {
  return requestAjax({
    url: '/api/pub/admin/role/delete',
    method: 'delete',
    data
  })
}
