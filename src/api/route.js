import { requestAjax } from './http'

export function getPubAdminRouteListAll (params) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/route/list/all',
    method: 'get',
    params
  })
}

export function postPubAdminRouteSaveBatch (data) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/route/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminRouteDelete (data) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/route/delete',
    method: 'delete',
    data
  })
}
