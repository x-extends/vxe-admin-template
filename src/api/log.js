import { requestAjax } from './http'

export function getPubAdminLogListPage (params) {
  return requestAjax({
    url: `/api/pub/admin/log/list/page/${params.pageSize}/${params.currentPage}`,
    method: 'get',
    params
  })
}
