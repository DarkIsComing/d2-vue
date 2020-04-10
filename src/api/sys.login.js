import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/admin/login/',
    method: 'post',
    data
  })
}

export function GetCode (phone) {
  return request({
    url: '/admin/send_message/',
    method: 'get',
    params: { phone }
  })
}
