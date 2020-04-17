import request from '@/plugin/axios'

export function getSignList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/sign/',
    method: 'get',
    params: params
  })
}

export function stopUse (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/complaint/',
    method: 'delete',
    data: params
  })
}
