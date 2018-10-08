import { request } from '../utils'


export async function getSize (params) {
  return request('/video/home/agent/getSize?agentId=' + params, {
    method: 'get',
  })
}

export async function getCurrentMember (params) {
  return request('/video/home/agent/getCurrentMember?agentId=' + params, {
    method: 'get',
  })
}

export async function getUserStatus (params) {
  return request('/video/home/agent/getUserStatus?agentId=' + params, {
    method: 'get',
  })
}

export async function getMemberStatus (params) {
  return request('/video/home/agent/getMemberStatus?agentId=' + params, {
    method: 'get',
  })
}

export async function getAgentStatus (params) {
  return request('/video/home/agent/getAgentStatus?agentId=' + params, {
    method: 'get',
  })
}

export async function getCardStatus (params) {
  return request('/video/home/agent/getCardStatus?agentId=' + params, {
    method: 'get',
  })
}

export async function getSalaryStatus (params) {
  return request('/video/home/agent/getSalaryStatus?agentId=' + params, {
    method: 'get',
  })
}
