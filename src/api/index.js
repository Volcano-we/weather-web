import request from '@/utils/request'

const api = {
  weatherList: '/api/weather',
  weatherRegion: '/api/region'
}

export function weatherList (parameter) {
  return request({
    url: api.weatherList,
    method: 'post',
    data: parameter
  })
}

export function weatherRegion (parameter) {
  return request({
    url: api.weatherRegion,
    method: 'post',
    data: parameter
  })
}

export function userLogout () {}
