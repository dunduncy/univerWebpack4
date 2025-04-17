import request from '@/utils/request'
import {baseModelPath} from '@/api/system/basePath.js'
import {showLoading} from '@/utils/loading'
/**
 * 新增电池pack
 * @param {
 * projectId	String	项目id
 * lccuId	String	lccuId
 * deviceId	String	设备id
 * orderNum	Integer	序号
 * packName	String	电池pack名称
 * } data 
* @returns 
*/
export function addBatteryPack(data,isloading=true) {
  if(isloading){
    showLoading()
  }
 return request({
   url: baseModelPath + '/api/batteryPack/addBatteryPack',
   method: 'post',
   data,
   headers:{
    isloading
  }
 })
}
/**
 * 修改电池pack
 * @param {
 * id	String	电池packid
 * deviceId	String	设备id
 * orderNum	Integer	序号
 * packName	String	电池pack名称
 * } data 
 * @returns 
 */
export function updateBatteryPack(data,isloading=true) {
  if(isloading){
    showLoading()
  }
  return request({
    url: baseModelPath + '/api/batteryPack/updateBatteryPack',
    method: 'post',
    data,
    headers:{
     isloading
   }
  })
}
/**
 * 删除电池pack
 * @param {
* batteryPackId	String	电池packid
* } data 
* @returns 
*/
export function deleteBatteryPack(data,isloading=true) {
  if(isloading){
    showLoading()
  }
  return request({
    url: baseModelPath + '/api/batteryPack/deleteBatteryPack',
    method: 'get',
    params:data,
    headers:{
     isloading
   }
  })
}

/**
 * 查询电池pack列表
 * @param {
* deviceId	String	设备id
* } data 
* @returns 
*/
export function listBatteryPack(data,isloading=true) {
  if(isloading){
    showLoading()
  }
  return request({
    url: baseModelPath + '/api/batteryPack/listBatteryPack',
    method: 'get',
    params:data,
    headers:{
     isloading
   }
  })
}

/**
 * 绑定电池pack数据点
 * @param {
 * packId	String	电池packid
 * statisticsType	Integer	统计类型 0 电压    1 温度
 * orderNum	Integer	电池pack 数据点的排序
 * dataId	String	遥测数据点id
 * } data 
* @returns 
*/
export function bindBatteryPackConfig(data,isloading=true) {
 if(isloading){
    showLoading()
  }
 return request({
   url: baseModelPath + '/api/batteryPack/bindBatteryPackConfig',
   method: 'post',
   data,
   headers:{
    isloading
  }
 })
}

/**
 * 查询电池pack配置数据列表
 * @param {
* batteryPackId	String	电池pack id
* } data 
* @returns 
*/
export function listBatteryPackConfig(data,isloading=true) {
  if(isloading){
    showLoading()
  }
  return request({
    url: baseModelPath + '/api/batteryPack/listBatteryPackConfig',
    method: 'get',
    params:data,
    headers:{
     isloading
   }
  })
}

/**
 * 删除电池pack数据点
 * @param {
* packConfigId	String	电池pack配置id
* } data 
* @returns 
*/
export function deletePackConfig(data,isloading=true) {
  if(isloading){
    showLoading()
  }
  return request({
    url: baseModelPath + '/api/batteryPack/deletePackConfig',
    method: 'get',
    params:data,
    headers:{
     isloading
   }
  })
}

/**
 * 修改电池pack数据点
 * @param {
 * id	String	pack配置id
 * orderNum	Integer	电池pack 数据点的排序
 * dataId	String	遥测数据点id
* } data 
* @returns 
*/
export function updatePackConfig(data,isloading=true) {
 if(isloading){
    showLoading()
  }
 return request({
   url: baseModelPath + '/api/batteryPack/updatePackConfig',
   method: 'post',
   data,
   headers:{
    isloading
  }
 })
}