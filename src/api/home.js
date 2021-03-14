import request from '@/utils/request.js'

export function getCategory (data) {
  return request({
    url: 'get_type',
    data
  })
}

export function getStore (data) {
  return request({
    url: 'get_store',
    data
  })
}

export function getDetail (data) {
  return request({
    url: 'get_store_id',
    data
  })
}

export function getNav (data) {
  return request({
    url: 'get_nav',
    data
  })
}
export function getComment (data) {
  return request({
    url: 'get_info',
    data
  })
}
