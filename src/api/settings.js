import request from '@/plugin/axios'

export function getSettings (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/sysbase/',
    method: 'get',
    params: params
  })
}

export function putSettings (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/sysbase/',
    method: 'put',
    data: params
  })
}
