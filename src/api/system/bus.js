import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function addBus(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'bus/addBus',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function updateBus(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'bus/updateBus',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function deleteBus(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'bus/deleteBus',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}
export function listBus(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'bus/listBus',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}