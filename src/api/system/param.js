import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function getParam(isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'getParam',
        method: 'get',
        headers: {
            isloading,
            noLang: true
        }
    })
}

export function setParam(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'setParam',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang: true
        }
    })
}

export function getLccuCfg(isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'getLccuCfg',
        method: 'get',
        headers: {
            isloading,
            noLang: true
        }
    })
}

export function setLccuCfg(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'setLccuCfg',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang: true
        }
    })
}


export function getPlanCurveTimeSpan(isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'getPlanCurveTimeSpan',
        method: 'get',
        headers: {
            isloading,
            noLang: true
        }
    })
}

export function getPlanCurve(params,isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'getPlanCurve',
        method: 'get',
        params,
        headers: {
            isloading,
            noLang: true
        }
    })
}

export function setPlanCurve(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'setPlanCurve',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang: true
        }
    })
}
