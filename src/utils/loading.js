import {Loading} from 'element-ui'
var loadingCount = 0;
var loading;

const startLoading = (dom,url)=>{
    if(dom){
        loading = Loading.service({
            text:'Loading',
            target:document.querySelector(dom)
        })
    }else{
        loading =  Loading.service({
            lock:true,
            text:'Loading',
        })
    }
}
const endLoading = ()=>{
    loading.close()
}
export const showLoading = (dom,url) => {
    if(loadingCount === 0){
        startLoading(dom,url)
    }
    loadingCount++
}

export const hideLoading = () =>{
    if(loadingCount<=0){
        return
    }
    loadingCount--
    if(loadingCount === 0){
        endLoading()
    }
}