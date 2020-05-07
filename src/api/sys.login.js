import request from '@/plugin/axios'

export function AccountLogin (data) {
  console.log('传入的参数', data)
  return request({
    url: '/admin/login/',
    method: 'post',
    data: data,
    withCredentials: true
  })
}

export function GetCode (phone) {
  console.log('传入的参数', phone)
  return request({
    url: '/admin/send_message/',
    method: 'get',
    params: { phone }
  })
}
