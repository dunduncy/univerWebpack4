import request from '@/utils/request'

export function getVUELanguageDataList() {
    return request({
      url: 'language/getVUELanguageDataList',
      method: 'get'
    })
}

export function getLanguageList() {
    return request({
      url: 'language/getLanguageList',
      method: 'get'
    })
}

