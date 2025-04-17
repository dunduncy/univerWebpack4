import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function listDeviceData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listDeviceData',
        method: 'get',
        params: data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listPoint(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listPoint/'+data.deviceKey,
        method: 'get',
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listHistoryData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listHistoryData',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function pageHistoryData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'pageHistoryData',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function pageHistoryYXData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'pageHistoryYXData',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}