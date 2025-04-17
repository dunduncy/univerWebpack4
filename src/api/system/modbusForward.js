import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function listDeviceModbusSelectByDataForward(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/device/listDeviceModbusSelectByDataForward',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}
export function addMemoryForwardData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/addMemoryForwardData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function updateMemoryForwardData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/updateMemoryForwardData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function deleteMemoryForwardData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/deleteMemoryForwardData',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}
export function listMemoryForwardData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/listMemoryForwardData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}