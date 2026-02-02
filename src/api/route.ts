import { requestAjax } from './http'

export interface RouteVO {
  _id: string
  name: string
  routeName: string
  code: string
  parentCode: string
  icon: string
  type: 'menu' | 'action'
}

export function getPubAdminRouteListAll (params?: any) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/route/list/all',
    method: 'get',
    params
  })
}

export function postPubAdminRouteSaveBatch (data?: any) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/route/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminRouteDelete (data?: any) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/route/delete',
    method: 'delete',
    data
  })
}
