import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function getAllLccuAlarm(isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'getAllLccuAlarm',
    method: 'get',
    headers: {
      isloading,
      noLang: true
    }
  })
}

/**
 * 
 * @param {
 * "id":"P01M02E002L15",	lccu配置id
 * "level":15,	报警等级
 * "enable":true	是否使能
 * } data 
 * @param {*} isloading 
 * @returns 
 */
export function updateLCCUAlarmCfg(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'updateLCCUAlarmCfg',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}