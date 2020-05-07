import request from '@/plugin/axios'

export function getPlatformList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/platform/',
    method: 'get',
    params: params
  })
}

export function getManagerList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/manager/',
    method: 'get',
    params: params
  })
}

export function deleteManager (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/manager/',
    method: 'delete',
    data: params
  })
}

export function putManager (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/manager/',
    method: 'put',
    data: params
  })
}

export function getUserList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/notice/user',
    method: 'get',
    params: params
  })
}
