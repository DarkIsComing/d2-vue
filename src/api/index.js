import request from '@/plugin/axios'

export function getHome (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/index/',
    method: 'get',
    params: params
  })
}

export function stopUse (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/user/',
    method: 'put',
    data: params
  })
}
