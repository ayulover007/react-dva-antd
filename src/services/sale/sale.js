import { request, Cookie } from '../../utils'

export async function query (params) {
  return request('/video/sale/page', {
    method: 'get',
    data: {
      ...params,
      agentId: Cookie.get('agent_type') === '0' ? '' : Cookie.get('agent_id')
    }
  })
}

export async function update (params) {
  return request('/video/sale/modify', {
    method: 'post',
    data: params
  })
}
