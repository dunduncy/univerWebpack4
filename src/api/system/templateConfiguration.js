import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

/*模板 */

export function addMqttTemplate(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/addMqttTemplate',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

export function updateMqttTemplate(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/updateMqttTemplate',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

export function deleteMqttTemplate(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/deleteMqttTemplate',
        method: 'get',
        params: data,
        headers: {
            isloading,
        }
    })
}

export function listMqttTemplate(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/listMqttTemplate',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

/*参数 */

export function addMqttTemplateProfile(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/addMqttTemplateProfile',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

export function updateMqttTemplateProfile(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/updateMqttTemplateProfile',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

export function deleteMqttTemplateProfile(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/deleteMqttTemplateProfile',
        method: 'get',
        params: data,
        headers: {
            isloading,
        }
    })
}

export function listMqttTemplateProfile(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/listMqttTemplateProfile',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

/*数据点 */

export function addMqttTemplateProp(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/addMqttTemplateProp',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

export function updateMqttTemplateProp(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/updateMqttTemplateProp',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

export function deleteMqttTemplateProp(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/deleteMqttTemplateProp',
        method: 'get',
        params: data,
        headers: {
            isloading,
        }
    })
}

export function listMqttTemplateProp(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/listMqttTemplateProp',
        method: 'post',
        data,
        headers: {
            isloading,
        }
    })
}

export function getMqttTemplatePropSpec(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'mqtt/device/getMqttTemplatePropSpec',
        method: 'get',
        params: data,
        headers: {
            isloading,
        }
    })
}