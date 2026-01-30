import { requestAjax } from './http'

export interface DemoVO {
  _id: string
  name: string
  nickname: string
  code: string
  amount: number | null
  commenceDate: string
  describe: string
}

export function getPubAdminDemoListPage (params?: any) {
  return requestAjax({
    url: `/publicapi/api/pub/admin/demo/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}

export function getPubAdminDemoDetail (params?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/demo/detail',
    method: 'get',
    params
  })
}

export function postPubAdminDemoSaveInfo (data?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/demo/save/info',
    method: 'post',
    data
  })
}

export function postPubAdminDemoSaveBatch (data?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/demo/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminDemoDelete (data?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/demo/delete',
    method: 'delete',
    data
  })
}
