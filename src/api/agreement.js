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
    method: 'put',
    data: params
  })
}


export function deleteAgreement (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/agreement/',
    method: 'delete',
    data: params
  })
}

export function agreementDetail (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/agreement/detail/',
    method: 'get',
    params: params
  })
}
