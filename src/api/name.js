import request from '@/plugin/axios'

export function getIdcardList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/user/idcard/',
    method: 'get',
    params: params
  })
}

export function getIdcardDetail (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/user/idcard/detail/',
    method: 'get',
    params: params
  })
}

export function postId (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/user/idcard/detail/',
    method: 'post',
    data: params
  })
}
