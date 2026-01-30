import { requestAjax } from './http'

export function getPubAdminUserListPage (params) {
  return requestAjax({
    url: `/publicapi/api/pub/admin/user/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}

export function postPubAdminUserCurrentChangeRole (data) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/user/current/change/role',
    method: 'post',
    data
  })
}

export function postPubAdminUserSaveBatch (data) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/user/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminUserDelete (data) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/user/delete',
    method: 'delete',
    data
  })
}
