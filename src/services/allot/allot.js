import { request, Cookie } from '../../utils'

export async function query (params) {
  return request('/video/allot/page', {
    method: 'get',
    data: {
      ...params,
      agentId: Cookie.get('agent_type') === '0' ? '' : Cookie.get('agent_id')
    }
  })
}
