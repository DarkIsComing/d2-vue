import request from '@/plugin/axios'

export function getComplaintList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/complaint/',
    method: 'get',
    params: params
  })
}
