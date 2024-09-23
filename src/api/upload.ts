import { requestAjax } from './http'
import { AxiosRequestConfig } from 'axios'

export interface RoleVO {
  name: string
  createTime: string
}

export function postPubAdminUploadSingle (data: any, options: AxiosRequestConfig) {
  return requestAjax({
    url: '/api/pub/admin/upload/single',
    method: 'post',
    data,
    ...options
  })
}
