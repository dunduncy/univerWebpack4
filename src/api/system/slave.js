import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function listBusSelect(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'bus/listBusSelect',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function add104Device(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/device/add104Device',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function update104Device(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/device/update104Device',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function delete104Device(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/device/delete104Device',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function list104Device(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/device/list104Device',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function addModbusDevice(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/device/addModbusDevice',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

export function updateModbusDevice(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/device/updateModbusDevice',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

export function deleteModbusDevice(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/device/deleteModbusDevice',
        method: 'get',
        params:data,
        headers: {
            isloading
        }
    })
}

export function listModbusDevice(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/device/listModbusDevice',
        method: 'get',
        params:data,
        headers: {
            isloading
        }
    })
}