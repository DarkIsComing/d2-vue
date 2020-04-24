import request from '@/plugin/axios'

export function getAgreementList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/agreement/',
    method: 'get',
    params: params
  })
}

export function postAgreement (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/agreement/',
    method: 'post',
    data: params
  })
}
