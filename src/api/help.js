import request from '@/plugin/axios'

export function getIdcardList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/user/idcard/',
    method: 'get',
    params: params
  })
}
