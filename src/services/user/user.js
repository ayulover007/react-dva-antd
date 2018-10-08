import { request, Cookie } from '../../utils'

export async function query (params) {
  return request('/video/user/page', {
    method: 'get',
    data: {
      ...params,
      agentId: Cookie.get('agent_type') === '0' ? '' : Cookie.get('agent_id')
    }
  })
}

export async function resetPwd (params) {
  return request(`/video/user/reset?userId=${params}`, {
    method: 'post',
  })
}
