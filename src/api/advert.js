import request from '@/plugin/axios'

export function getAdvertList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/user/idcard/',
    method: 'get',
    params: params
  })
}
export function deleteAdvert (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/times/',
    method: 'delete',
    data: params
  })
}
