import { request } from '../utils'

export async function getSize (params) {
  return request('/video/home/mgr/getSize', {
    method: 'get',
    data: params
  })
}

export async function getCurrentMember (params) {
  return request('/video/home/mgr/getCurrentMember', {
    method: 'get',
    data: params
  })
}

export async function getUserStatus (params) {
  return request('/video/home/mgr/getUserStatus', {
    method: 'get',
    data: params
  })
}

export async function getMemberStatus (params) {
  return request('/video/home/mgr/getMemberStatus', {
    method: 'get',
    data: params
  })
}

export async function getAgentStatus (params) {
  return request('/video/home/mgr/getAgentStatus', {
    method: 'get',
    data: params
  })
}

export async function getCardStatus (params) {
  return request('/video/home/mgr/getCardStatus', {
    method: 'get',
    data: params
  })
}

export async function getSalaryStatus (params) {
  return request('/video/home/mgr/getSalaryStatus', {
    method: 'get',
    data: params
  })
}
