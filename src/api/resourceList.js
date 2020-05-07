import request from '@/plugin/axios'

export function getResourceList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/resource/',
    method: 'get',
    params: params
  })
}

export function stopUse (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/resource/',
    method: 'delete',
    data: params
  })
}

export function getResourceDetail (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/resource/detail/',
    method: 'get',
    params: params
  })
}

export function getResourceRecommendList (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/resource/recommand/',
    method: 'get',
    params: params
  })
}


// 推荐
export function Recommend (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/resource/recommand/',
    method: 'post',
    data: params
  })
}

// 取消推荐
export function UnRecommend (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/resource/recommand/',
    method: 'delete',
    data: params
  })
}

// 推荐详情
export function getRecommandDetail (params) {
  console.log('传入的参数', params)
  return request({
    url: '/admin/resource/recommand/detail',
    method: 'get',
    params: params
  })
}
