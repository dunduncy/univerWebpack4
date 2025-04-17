import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function listDI(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'listDI',
    method: 'get',
    params:data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function updateDO(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'updateDO',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function getDIOEnable(isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'getDIOEnable',
    method: 'get',
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function updateDIOEnable(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'updateDIOEnable',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}