import { requestAjax } from './http'

export function getPubAdminDemoListPage (params) {
  return requestAjax({
    url: `/adminapi/api/pub/admin/demo/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}

export function getPubAdminDemoDetail (params) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/demo/detail',
    method: 'get',
    params
  })
}

export function postPubAdminDemoSaveInfo (data) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/demo/save/info',
    method: 'post',
    data
  })
}

export function postPubAdminDemoSaveBatch (data) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/demo/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminDemoDelete (data) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/demo/delete',
    method: 'delete',
    data
  })
}
