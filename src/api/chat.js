import request from '@/plugin/axios'

export function getChatList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/chat/',
    method: 'get',
    params: params
  })
}

export function getChatDetail (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/chat/detail/',
    method: 'get',
    params: params
  })
}

export function getChatInfo (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/chat/detail/',
    method: 'post',
    data: params
  })
}

export function deleteChat (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/chat/',
    method: 'delete',
    data: params
  })
}
