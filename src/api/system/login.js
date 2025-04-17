import request from '@/utils/request'
import { showLoading } from '@/utils/loading'
export function login(userName, pwd, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'user/login',
    method: 'post',
    data: {
      userName,
      pwd
    },
    headers: {
      isloading,
    }
  })
}

export function login_ysl(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'login',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function updatePwd(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'updatePwd',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function getCurrDate_ysl(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'getCurrDate',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function setCurrDate_ysl(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'setCurrDate',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function listTimezone(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'listTimezone',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function getATimeZone(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'getATimeZone',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function listLanInfo(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'listLanInfo',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}
export function addLanInfo(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'addLanInfo',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}
export function updateLanInfo(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'updateLanInfo',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}
export function deleteLanInfo(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'deleteLanInfo',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}
export function getCpuUsage(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'getCpuUsage',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}
export function getMemoryUsage(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'getMemoryUsage',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}
export function getDiskUsage(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'getDiskUsage',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function listVersion(data, isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'listVersion',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function uploadFile(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'uploadFile',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true,
      //'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq'
      'Content-Type':'application/octet-stream'
    },
  })
}

export function exportFile(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'exportFile',
    method: 'get',
    params: data,
    responseType: 'blob',
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function packLccu(data, isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'packLccu',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function restartLccu(data, isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'restartLccu',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function uploadFrontend(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'uploadFrontend',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true,
      //'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq'
      'Content-Type':'application/octet-stream'
    },
  })
}

export function listOperateLog(data, isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'listOperateLog',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function listNTPInfo(data, isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'listNTPInfo',
    method: 'get',
    params:data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function getNTPStatus(data, isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'getNTPStatus',
    method: 'get',
    params:data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function updateNTPStatus(data, isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'updateNTPStatus/'+data,
    method: 'get',
    params:data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function updateNTPInfo(data, isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'updateNTPInfo',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function uploadSystemPackage(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'uploadSystemPackage',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true,
      'Content-Type':'application/octet-stream'
    },
  })
}

export function installSystemPack(data, isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'installSystemPack',
    method: 'get',
    params:data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function getMeterConfig(isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'getMeterConfig',
    method: 'get',
    headers: {
      isloading,
      noLang: true
    }
  })
}
export function updateMeterConfig({meter_grid,meter_bess},isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: `updateMeterConfig/${meter_grid}/${meter_bess}`,
    method: 'get',
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function justRestartLccuCedar(isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: `justRestartLccuCedar`,
    method: 'get',
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function packConfig(data, isloading = true){
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'packConfig',
    method: 'get',
    params: data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function exportConfig(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'exportConfig',
    method: 'get',
    params: data,
    responseType: 'blob',
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function uploadConfigPackage(data, isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'uploadConfigPackage',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true,
      'Content-Type':'application/octet-stream'
    },
  })
}

export function updateConfigPackage(isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'updateConfigPackage',
    method: 'get',
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function listSerialNumber(isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'listSerialNumber',
    method: 'post',
    headers: {
      isloading,
      noLang: true
    }
  })
}


export function updateSerialNumber(data,isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'updateSerialNumber',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function listPortForward(data,isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'listPortForward',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function addPortForward(data,isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'addPortForward',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function updatePortForward(data,isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'updatePortForward',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function deletePortForward(data,isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'deletePortForward',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function closePortForward(data,isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'closePortForward',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function openPortForward(data,isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'openPortForward',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}

export function ping_addr (data,isloading = true) {
  if (isloading) {
    showLoading()
  }
  return request({
    url: 'ping_addr ',
    method: 'post',
    data,
    headers: {
      isloading,
      noLang: true
    }
  })
}