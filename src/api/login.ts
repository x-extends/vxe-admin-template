import { requestAjax } from './http'

export function getPubAdminLoginInfo (params?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/login/info',
    method: 'get',
    params
  })
}

export function postPubAdminLoginValid (data?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/login/valid',
    method: 'post',
    data
  })
}

export function postPubAdminLoginRegister (data?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/login/register',
    method: 'post',
    data
  })
}

export function postPubAdminLogout (data?: any) {
  return requestAjax({
    url: '/publicapi/api/pub/admin/logout',
    method: 'post',
    data
  })
}
