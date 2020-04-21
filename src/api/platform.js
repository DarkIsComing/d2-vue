import request from '@/plugin/axios'

export function getPlatformList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/platform/',
    method: 'get',
    params: params
  })
}
