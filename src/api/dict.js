import { requestAjax } from './http'

export function getPubAdminDictListPage (params) {
  return requestAjax({
    url: `/publicapi/api/pub/admin/dict/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}

export function postPubAdminDictSaveBatch (data) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/dict/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminDictDelete (data) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/dict/delete',
    method: 'delete',
    data
  })
}

export function getPubAdminDictDataListPage (params) {
  return requestAjax({
    url: `/publicapi/api/pub/admin/dict/data/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}

export function getPubAdminDictDataConfig (params) {
  return requestAjax({
    url: `/publicapi/api/pub/admin/dict/data/config/${params.code}`,
    method: 'get',
    params
  })
}

export function postPubAdminDictDataSaveBatch (data) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/dict/data/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminDictDataDelete (data) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/dict/data/delete',
    method: 'delete',
    data
  })
}
