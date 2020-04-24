import request from '@/plugin/axios'

export function getCashList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/cashorder/',
    method: 'get',
    params: params
  })
}


export function cashTranfer (params) {
  console.log('传入的参数', params)
  return request({
    url: '/pay/alipay/cash',
    method: 'post',
    data: params
  })
}
