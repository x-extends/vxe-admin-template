import axios, { AxiosResponse, AxiosRequestConfig, Axios } from 'axios'
import { VxeUI } from 'vxe-pc-ui'
import { useUserStore } from '@/store/user'

interface CustomResponseResult<T = any> {
  code: number
  data: T
  msg: string
  page: {
    pageSize: number
    currentPage: number
    total: number
  }
  status: number
}

interface CustomAxiosInstance extends Axios {
  <T = CustomResponseResult>(config: AxiosRequestConfig): Promise<T>
  <T = CustomResponseResult>(url: string, config?: AxiosRequestConfig): Promise<T>
}

export function createHttp (baseUrl?: string): CustomAxiosInstance {
  const request = axios.create({
    baseURL: baseUrl || import.meta.env.VITE_APP_BASE_API,
    timeout: 20000 // 请求超时时间
  })

  request.interceptors.request.use(config => {
    const userStore = useUserStore()
    const defHeaders = {
      token: userStore.token
    }
    config.headers = Object.assign({}, defHeaders, config.headers)
    return config
  })

  const handleResponse = (response: AxiosResponse) => {
    const { data, status } = response
    const userStore = useUserStore()
    switch (status) {
      case 401:
        userStore.clearLogin()
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

export const requestAjax = createHttp(import.meta.env.VITE_APP_BASE_API)
