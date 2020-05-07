import request from '@/plugin/axios'

export function getKeywordList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/keyword/',
    method: 'get',
    params: params
  })
}

export function deleteKeyword (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/keyword/',
    method: 'delete',
    data: params
  })
}


export function getKeywordDetail (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/keyword/detail/',
    method: 'get',
    params: params
  })
}
