import {Cookie, request} from '../../utils'

export async function query (params) {
  return request('/video/agent/page', {
    method: 'get',
    data: {
      ...params,
      agentId: Cookie.get('agent_type') === '0' ? '' : Cookie.get('agent_id')
    }
  })
}

export async function create (params) {
  return request('/video/agent/add', {
    method: 'post',
    data: params
  })
}

export async function get (params) {
  return request('/video/agent/get/' + params.agentId, {
    method: 'get',
  })
}

export async function update (params) {
  return request('/video/agent/modify', {
    method: 'post',
    data: params
  })
}

export async function allot (params) {
  return request(`/video/card/allot?dayNum=${params.dayCardAvailable}&monthNum=${params.monthCardAvailable}&quarterNum=${params.quarterCardAvailable}&oriAgentId=${Cookie.get('agent_id')}&targetAgentId=${params.agentId}`, {
    method: 'post',
  })
}

export async function sale (params) {
  return request(`/video/card/sale?dayNum=${params.dayCardAvailable}&monthNum=${params.monthCardAvailable}&quarterNum=${params.quarterCardAvailable}&oriAgentId=${Cookie.get('agent_id')}&targetAgentId=${params.agentId}`, {
    method: 'post',
  })
}

export async function deleteAgent (params) {
  return request('/video/agent/del/' + params, {
    method: 'post',
  })
}
