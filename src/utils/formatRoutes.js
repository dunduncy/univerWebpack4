import Layout from '@/layout'
import emptyCom from '@/emptyCom'

function loadView(component) {
  return (resolve) => require([`@/views/system/${component}`], resolve)
}
export default function formatRoutes(routes) {

    const formatRoutesArr = []
    routes.forEach((route,index) => {
      if(route.resourceRoute=='/model'){
        route.childList.push({
          resourceRoute:'/lccuSetting',
          resourceId:'/lccuSetting',
          //functionValue:[],
          functionShowPermission:[],
          resourceShowPermission:[],
          resourceName:'终端设置',
          resourceType:3,
          hidden:true
        }, {
          resourceRoute:'/term',
          resourceId:'/term',
          //functionValue:[],
          functionShowPermission:[],
          resourceShowPermission:[],
          resourceName:'在线终端',
          resourceType:3,
          hidden:true
        })
      }
      if(route.resourceRoute=='/dataAnalyse'){
        route.childList.push({
          resourceRoute:'/projectDetail',
          resourceId:'/projectDetail',
          //functionValue:[],
          functionShowPermission:[],
          resourceShowPermission:[],
          resourceName:'项目详情',
          resourceType:3,
          hidden:true
        },
        {
          resourceRoute:'/lccuDetail',
          resourceId:'/lccuDetail',
          //functionValue:[],
          functionShowPermission:[],
          resourceShowPermission:[],
          resourceName:'LCCU详情',
          resourceType:3,
          hidden:true
        })
      }
      if(route.resourceRoute=='/workOrder'){
        route.childList.push({
          resourceRoute:'/orderDetail',
          resourceId:'/orderDetail',
          //functionValue:[],
          functionShowPermission:[],
          resourceShowPermission:[],
          resourceName:'工单详情',
          resourceType:3,
          hidden:true
        })
      }
      const router = {
        meta: {}
      }
      const {
        resourceRoute:path,
        resourceId,
        functionShowPermission,
        resourceShowPermission,
        childList:children,
        resourceName:title,
        resourceType,
        hidden
      } = route
      
      

      if (title !== null) {
        router['meta']['title'] = title
      }
      if (path !== null) {
        if(route.level&&route.level==1){
          router['path'] = path
          router['name'] = path
        }else{
          router['path'] = path.slice(1)
          router['name'] = path.slice(1)
        }
        // router['path'] = path
        // router['name'] = path
        router['meta']['langKey'] = path.slice(1)
      }
      // functionShowPermission
      if (functionShowPermission && functionShowPermission instanceof Array && functionShowPermission.length > 0) {
        router['meta']['functionShowPermission'] = functionShowPermission
        
      }else{
        router['meta']['functionShowPermission'] = []
      }

      //resourceShowPermission
      if (resourceShowPermission && resourceShowPermission instanceof Array && resourceShowPermission.length > 0) {
        router['meta']['resourceShowPermission'] = resourceShowPermission
      }else{
        router['meta']['resourceShowPermission'] = []
      }

      // if (functionValue && functionValue instanceof Array && functionValue.length > 0) {
      //   router['meta']['functionValue'] = functionValue
        
      // }else{
      //   router['meta']['functionValue'] = []
      // }
      if(hidden){
        router['hidden'] = true
      }
      if (children && children instanceof Array && children.length > 0) {
        router['children'] = formatRoutes(children)
        // 判断是不是第一层
        if(route.level&&route.level==1){
          router['component'] = Layout
        }else{
          router['component'] = emptyCom
        }
        if (title !== null) {
          router['meta']['icon'] = 'img-'+title+'1.png'
        }
      }else{
          if(route.level&&route.level==1){
            router['component'] = Layout
            router['meta']['icon'] = 'img-'+title+'1.png'
          }else{
            router['component'] = loadView(path.slice(1))
          }
      }
      formatRoutesArr.push(router)
    })
    // 将404页面添加到最后面
    // formatRoutesArr.push({ path: '*', redirect: '/404', hidden: true })
    return formatRoutesArr
  }