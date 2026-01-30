import { requestAjax } from './http'

export interface RoleVO {
  _id: string
  name: string
  code: string
  createTime: string
  level: number
}

export function getPubAdminRoleOptions (params?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/role/options',
    method: 'get',
    params
  })
}

export function getPubAdminRoleListPage (params?: any) {
  return requestAjax({
    url: `/publicapi/api/pub/admin/role/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}

export function postPubAdminRoleSaveBatch (data?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/role/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminRoleDelete (data?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/role/delete',
    method: 'delete',
    data
  })
}
