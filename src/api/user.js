import request from '@/plugin/axios'

export function getUserList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/user/',
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


export function getUserDetail (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/user/detail/',
    method: 'get',
    params: params
  })
}
