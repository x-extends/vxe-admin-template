import { requestAjax } from './http'

export interface LogVO {
  type: string
  status: string
  content: string
}

export function getPubAdminLogListPage (params?: any) {
  return requestAjax({
    url: `/api/pub/admin/log/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}
