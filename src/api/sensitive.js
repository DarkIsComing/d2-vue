import request from '@/plugin/axios'

export function getSensitiveList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/sensitiveword/',
    method: 'get',
    params: params
  })
}

export function deleteSensitive (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/sensitiveword/',
    method: 'delete',
    data: params
  })
}

export function postSensitive (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/sensitiveword/',
    method: 'post',
    data: params
  })
}
