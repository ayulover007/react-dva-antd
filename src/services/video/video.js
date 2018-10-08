import { request } from '../../utils'

export async function query (params) {
  return request('/video/data/page', {
    method: 'get',
    data: {
      ...params
    }
  })
}

export async function deleteVideo (params) {
  return request('/video/data/del/' + params, {
    method: 'post',
  })
}


export async function getRootTypes() {
  return request('/video/type/getTypes', {
    method: 'get',
  })
}


export async function create (params) {
  const typeIds = params.typeId.join(',');
  delete params.typeId;
  return request(`/video/data/add?typeIdStr=${typeIds}`, {
    method: 'post',
    data: {
      ...params
    }
  })
}

export async function get (params) {
  return request('/video/data/get/' + params.videoId, {
    method: 'get',
  })
}

export async function update (params) {
  const typeIds = params.typeId.join(',');
  delete params.typeId;
  return request(`/video/data/modify?typeIdStr=${typeIds}`, {
    method: 'post',
    data: {
      ...params
    }
  })
}
