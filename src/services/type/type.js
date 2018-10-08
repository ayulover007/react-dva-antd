import { request } from '../../utils'

export async function query (params) {
  return request('/video/type/page', {
    method: 'get',
    data: {
      ...params
    }
  })
}

export async function deleteType (params) {
  return request('/video/type/del/' + params, {
    method: 'post',
  })
}


export async function getRootTypes() {
  return request('/video/type/getRootTypes', {
    method: 'get',
  })
}


export async function create (params) {
  return request('/video/type/add', {
    method: 'post',
    data: params
  })
}

export async function get (params) {
  return request('/video/type/get/' + params.typeId, {
    method: 'get',
  })
}

export async function update (params) {
  return request('/video/type/modify', {
    method: 'post',
    data: params
  })
}
