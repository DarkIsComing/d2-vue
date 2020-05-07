import request from '@/plugin/axios'

export function getNoticeList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/notice/',
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

export function getNoticeUserList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/notice/user/',
    method: 'get',
    params: params
  })
}

export function postNotice (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/notice/',
    method: 'post',
    data: params
  })
}
// 上传图片
export function putNotice (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/notice/',
    method: 'put',
    data: params
  })
}
