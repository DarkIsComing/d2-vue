import request from '@/plugin/axios'

export function getResourceList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/resource/',
    method: 'get',
    params: params
  })
}

export function stopUse (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/resource/',
    method: 'delete',
    data: params
  })
}

export function getResourceDetail (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/resource/detail/',
    method: 'get',
    params: params
  })
}
