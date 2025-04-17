import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function addDataForward(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'data/relation/addDataForward',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function updateDataForward(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'data/relation/updateDataForward',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function deleteDataForward(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'data/relation/deleteDataForward',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}
export function listNorthBusTree(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'data/relation/listNorthBusTree',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function listSouthBusSelect(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'data/relation/listSouthBusSelect',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function listNorthDataForward(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'data/relation/listNorthDataForward',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

