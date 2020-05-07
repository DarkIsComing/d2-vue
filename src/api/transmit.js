import request from '@/plugin/axios'

export function getTransmitList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/times/',
    method: 'get',
    params: params
  })
}

export function deleteTransmit (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/times/',
    method: 'delete',
    data: params
  })
}

export function getTransmitEchart (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/times/echart/',
    method: 'get',
    params: params
  })
}
