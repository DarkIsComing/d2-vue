import request from '@/plugin/axios'

export function getInviteList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/invite/',
    method: 'get',
    params: params
  })
}

export function deleteInvite (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/invite/',
    method: 'delete',
    data: params
  })
}
