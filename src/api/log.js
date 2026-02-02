import { requestAjax } from './http'

export function getPubAdminLogListPage (params) {
  return requestAjax({
    url: `/adminapi/api/pub/admin/log/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}
