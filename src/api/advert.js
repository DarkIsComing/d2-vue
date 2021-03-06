import request from '@/plugin/axios'

export function getAdvertList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/advert/advert/',
    method: 'get',
    params: params
  })
}

export function postAdvert (params) {
  console.log('传入的参数', params)
  return request({
    url: '/advert/advert/',
    method: 'post',
    data: params
  })
}

export function deleteAdvert (params) {
  console.log('传入的参数', params)
  return request({
    url: '/advert/advert/',
    method: 'delete',
    data: params
  })
}
