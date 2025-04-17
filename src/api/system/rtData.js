import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

export function getTriggerLccuAlarm(isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'getTriggerLccuAlarm',
        method: 'get',
        headers: {
            isloading,
            noLang:true
        }
    })
}
export function listLiquidCoolData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listLiquidCoolData',
        method: 'get',
        params: data,
        headers: {
            isloading,
            noLang:true
        }
    })
}
export function listFireFightData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listFireFightData',
        method: 'get',
        params: data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listGridMeterData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listGridMeterData',
        method: 'get',
        params: data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listBessMeterData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listBessMeterData',
        method: 'get',
        params: data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listDehumData(data, isloading = false) {
  if (isloading) {
      showLoading()
  }
  return request({
      url: 'listDehumData',
      method: 'get',
      params: data,
      headers: {
          isloading,
          noLang:true
      }
  })
}

export function listControlData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listControlData',
        method: 'get',
        params: data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listEnergyFlowData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listEnergyFlowData',
        method: 'get',
        params: data,
        headers: {
            isloading,
            noLang:true
        }
    })
}
export function commandIssued(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'commandIssued',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}
export function listBatteryOverviewData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listBatteryOverviewData',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listBatteryYXData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listBatteryYXData',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}



export function listBatteryVlotageData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listBatteryVlotageData',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listBatteryTemperatureData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listBatteryTemperatureData',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listBatteryParamData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listBatteryParamData',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function updateBatteryParam(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'updateBatteryParam',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listPCSRealTimeData(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listPCSRealTimeData',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function listPCSRealTimeAlarm(data, isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listPCSRealTimeAlarm',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}


export function listSystemCtlData(isloading = false) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'listSystemCtlData',
        method: 'get',
        headers: {
            isloading,
            noLang:true
        }
    })
}
/**   

"commandType": 3,	命令下发类型 1:EMS允许控制来源 2:EMS控制模式 3:EMS有功控制模式 4:启动 5:停机 6:复位
"commandValue": 1	
"下发的值:
当类型为1时，commandValue取值范围： 1:Modbus 2:IEC104  3:BCP  4:YSL-EMS  5:HMI   6:WEB
当类型为2时，commandValue取值范围： true自动控制  false手动控制
当类型为3时，commandValue取值范围： 1手动有功调节 2计划曲线调节 3混合算法调节
当类型为4或5或6时，commandValue取值为 true"

 */
export function commandSystem(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'commandSystem',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}

export function commandPCSDCVIssued(data, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: 'commandPCSDCVIssued',
        method: 'post',
        data,
        headers: {
            isloading,
            noLang:true
        }
    })
}
