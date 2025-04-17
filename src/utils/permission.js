import store from "@/store";
import router from "@/router";
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles;
    const permissionRoles = value;

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role);
    });
    return hasPermission;
  } else {
    console.error(`需要一个角色来登录!像是"['admin','editor']"的类似的`);
    return false;
  }
}

export function isAuth(key,projectIdList,lccuIdList) {
  // if(this.$store.state.user.highRoleFlag){
  //   return true
  // }else{
    if(projectIdList&&projectIdList.length>0){
      projectIdList=projectIdList.filter(v=>v)
    }
    if(lccuIdList&&lccuIdList.length>0){
      lccuIdList=lccuIdList.filter(v=>v)
    }

    if(router.history.current.meta.functionShowPermission&&router.history.current.meta.functionShowPermission.length>0){
      let arr = router.history.current.meta.functionShowPermission.map(v=>v.functionValue)
      if(arr.indexOf(key)!==-1){

        if((projectIdList&&projectIdList.length>0)||(lccuIdList&&lccuIdList.length>0)){
          let k = router.history.current.meta.functionShowPermission.find(v => v.functionValue==key)

          let flag = false
          for (let index = 0; index < k.vos.length; index++) {
            const v = k.vos[index];
            // 第一种情况 projectId 和lccuIdList 均存在
            if(v.projectId&&v.lccuIdList&&v.lccuIdList.length>0){
              if((projectIdList&&projectIdList.length>0)&&(lccuIdList&&lccuIdList.length>0)){
                //console.log("1", projectIdList,lccuIdList)
                let proIndex =  projectIdList.findIndex(pro=>v.projectId==pro)
                let lccuIndex = lccuIdList.findIndex(lccuId=>{
                  return v.lccuIdList.findIndex(lc=>lc == lccuId)>-1
                })
                //console.log(proIndex,lccuIndex)
                if(proIndex>-1&&lccuIndex>-1){
                  flag = true
                  return flag
                }
              }
            }
            // 第二种情况 projectId不存在 lccuIdList 存在
            if(!v.projectId&&v.lccuIdList&&v.lccuIdList.length>0){
              if(lccuIdList&&lccuIdList.length>0){
                //console.log("2", projectIdList,lccuIdList)
                let lccuIndex = lccuIdList.findIndex(lccuId=>{
                  return v.lccuIdList.findIndex(lc=>lc == lccuId)>-1
                })
                if(lccuIndex>-1){
                  flag = true
                  return flag
                }
              }
            }
            
            // 第三种情况 projectId存在 lccuIdList 不存在
            if(v.projectId&&(!v.lccuIdList||v.lccuIdList.length==0)){
              if(projectIdList&&projectIdList.length>0){
                //console.log("3", projectIdList,lccuIdList)
                let proIndex =  projectIdList.findIndex(pro=>v.projectId==pro)
                if(proIndex>-1){
                  flag = true
                  return flag
                }
              }
            }
          }
        
          return flag
        }else{
          // 不存在LCCU和Project
          return true
        }
        
       

      }else{
        return false
      }

    }else{
      return false
    }
    
    // if(this.$route.meta.functionValue){
    //   return (
    //     this.$route.meta.functionValue.indexOf(key)!==-1 || false
    //   );
    // }else{
    //   return false
    // }
  // }
}