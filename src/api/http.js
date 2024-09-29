import axios from 'axios'
import { VxeUI } from 'vxe-pc-ui'
import store from '@/store'

export function createHttp (baseUrl) {
  const request = axios.create({
    baseURL: baseUrl || process.env.VUE_APP_BASE_API,
    timeout: 20000 // 请求超时时间
  })

  request.interceptors.request.use(config => {
    const defHeaders = {
      token: store.getters.token
    }
    config.headers = Object.assign({}, defHeaders, config.headers)
    return config
  })

  const handleResponse = (response) => {
    const { data, status } = response
    switch (status) {
      case 401:
        store.dispatch('clearLogin')
        return Promise.reject(data)
    }
    if (data) {
      if (data.code === 200) {
        return data
      } else {
        VxeUI.modal.message({
          id: 'httpErr',
          content: data.msg || '操作失败',
          status: 'error'
        })
      }
    }
    return Promise.reject(data)
  }

  request.interceptors.response.use(response => {
    return handleResponse(response)
  }, (err) => {
    const { response } = err
    if (response) {
      return handleResponse(response)
    }
    console.error(err)
    return Promise.reject(err)
  })

  return request
}

export const requestAjax = createHttp(process.env.VUE_APP_BASE_API)
