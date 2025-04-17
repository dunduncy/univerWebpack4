import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function pageLccuAlarmData(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'pageLccuAlarmData',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function listLccuAlarmData(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'listLccuAlarmData',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}