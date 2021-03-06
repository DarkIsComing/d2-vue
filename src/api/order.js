import request from '@/plugin/axios'

export function getOrderList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/order/',
    method: 'get',
    params: params
  })
}

export function stopUse (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/complaint/',
    method: 'delete',
    params: { 'id': params }
  })
}
