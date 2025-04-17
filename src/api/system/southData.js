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

export function add104SouthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/data/add104SouthData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function update104SouthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/data/update104SouthData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}
export function delete104SouthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/data/delete104SouthData',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}

export function list104SouthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '104/data/list104SouthData',
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

export function addModbusSouthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/addModbusSouthData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

export function updateModbusSouthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/updateModbusSouthData',
        method: 'post',
        data,
        headers: {
            isloading
        }
    })
}

export function deleteModbusSouthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/deleteModbusSouthData',
        method: 'get',
        params:data,
        headers: {
            isloading
        }
    })
}

export function listModbusSouthData(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'modbus/data/listModbusSouthData',
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