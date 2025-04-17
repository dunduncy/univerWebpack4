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

export function listDevice104Select(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/device/listDevice104Select',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function listDevice104SelectByDataCopy(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/device/listDevice104SelectByDataCopy',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function listDeviceModbusSelect(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/device/listDeviceModbusSelect',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}
export function listDeviceModbusSelectByDataCopy(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/device/listDeviceModbusSelectByDataCopy',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function add104NorthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/data/add104NorthData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function update104NorthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/data/update104NorthData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function delete104NorthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/data/delete104NorthData',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function list104NorthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/data/list104NorthData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

export function dataCopy104(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/data/dataCopy',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

export function addModbusNorthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/addModbusNorthData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

export function updateModbusNorthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/updateModbusNorthData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

export function deleteModbusNorthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/deleteModbusNorthData',
        method: 'get',
        params:data,
        headers: {
            isloading
        }
    })
}

export function listModbusNorthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/listModbusNorthData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

export function dataCopyModbus(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/dataCopy',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}