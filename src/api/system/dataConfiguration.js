import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function listRenInfo(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'ren/cloud/listRenInfo',
        method: 'get',
        params: data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listMqttInfo(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/listMqttInfo',
        method: 'get',
        params: data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listRenOperate(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'ren/cloud/listRenOperate',
        method: 'get',
        params: data,
        headers: {
            isloading,
            noLang:true
        }
    })
}
