import { request } from '../utils'


export async function login (params) {
  return request('/video/agent/query', {
    method: 'post',
    dataType: 'form',
    data: params
  })
}

export async function logout (params) {
  return request('/api/logout', {
    method: 'post',
    data: params
  })
}

export async function userInfo (params) {
  return request('/api/userInfo', {
    method: 'get',
    data: params
  })
}
