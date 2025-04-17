import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function addDataCallback(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'data/relation/addDataCallback',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function updateDataCallback(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'data/relation/updateDataCallback',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function deleteDataCallback(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'data/relation/deleteDataCallback',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function listNorthDataCallback(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'data/relation/listNorthDataCallback',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

