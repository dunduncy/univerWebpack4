import request from '@/utils/request'
import { showLoading } from '@/utils/loading'


export function addMqttTopology(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/topology/addMqttTopology',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

export function updateMqttTopology(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/topology/updateMqttTopology',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

export function deleteMqttTopology(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/topology/deleteMqttTopology',
        method: 'get',
        params: data,
        headers: {
            isloading,
        }
    })
}

export function listMqttTopologyTree(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/topology/listMqttTopologyTree',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}