import { requestAjax } from './http'

export interface DictVO {
  _id: string
  name: string
  code: string
  parentCode: string
}

export function getPubAdminDictListPage (params?: any) {
  return requestAjax({
    url: `/adminapi/api/pub/admin/dict/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}

export function postPubAdminDictSaveBatch (data?: any) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/dict/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminDictDelete (data?: any) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/dict/delete',
    method: 'delete',
    data
  })
}

export function getPubAdminDictDataListPage (params?: any) {
  return requestAjax({
    url: `/adminapi/api/pub/admin/dict/data/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}

export function getPubAdminDictDataConfig (params?: any) {
  return requestAjax({
    url: `/adminapi/api/pub/admin/dict/data/config/${params.code}`,
    method: 'get',
    params
  })
}

export function postPubAdminDictDataSaveBatch (data?: any) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/dict/data/save/batch',
    method: 'post',
    data
  })
}

export function deletePubAdminDictDataDelete (data?: any) {
  return requestAjax({
    url: '/adminapi/api/pub/admin/dict/data/delete',
    method: 'delete',
    data
  })
}
