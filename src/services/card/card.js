import { request, Cookie } from '../../utils'

export async function query (params) {
  return request('/video/card/page', {
    method: 'get',
    data: {
      ...params,
      agentId: Cookie.get('agent_type') === '0' ? '' : Cookie.get('agent_id')
    }
  })
}

export async function create (params) {
  return request(`/video/card/add?dayNum=${params.dayNum}&monthNum=${params.monthNum}&quarterNum=${params.quarterNum}&agentId=${Cookie.get('agent_id')}`, {
    method: 'post',
  })
}
