import request from '@/utils/request'
import { showLoading } from '@/utils/loading'

/**
 * 查询云平台地址
 * @param {*} data 
 * @param {*} isloading 
 * @returns {
 * code	int	1:成功 0:失败			
 * msg	String	"code为1时:msg=成功   code为2时:msg=失败原因"		
 * data	List		id	String	主键
 * 			        ip	String	ip
 * 			        port	String	端口
 * 			        enableFlag	Integer	是否开启 0不开启 1开启
 * }
 */
export function listRenInfo(data={}, isloading = true) {
    if (isloading) {
        showLoading()
    }
    return request({
        url: '/ren/cloud/listRenInfo',
        method: 'get',
        params: data,
        headers: {
            isloading
        }
    })
}