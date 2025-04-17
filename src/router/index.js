import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */

import emptyCom from '@/emptyCom'
import subView from '@/views/subView/index.vue'
import cloudComm from '@/views/cloudComm/index.vue'
export const constantRoutes = [
  //  登录的路由
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
    hidden: true
  },
  //   错误页面
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true

  },
  {
    path: "/set",
    component: Layout,
    hidden: true,
    name:'set',
    meta: { title: "set", icon: 'img-运行数据1.png', langKey: 'set' },
    children: [
      {
        path: "timeZone",
        name:'timeZone',
        component: () => import("@/views/timeZone/index.vue"),
        meta: { title: "timeZone", icon: 'img-运行数据1.png', langKey: 'timeZone' },
        hidden: true,
      }
    ]
  },
  {
    path: "/update",
    component: Layout,
    hidden: true,
    name:'update',
    meta: { title: "update", icon: 'img-运行数据1.png', langKey: 'update' },
    children: [
      {
        path: "updatePassword",
        name:'updatePassword',
        component: () => import("@/views/updatePassword/index.vue"),
        meta: { title: "updatePassword", icon: 'img-运行数据1.png', langKey: 'updatePassword' },
        hidden: true,
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    redirect: "/systemView/rtData/Overview",
  },
  {
    path: "/systemManagement",
    component: Layout,
    name: "systemManagement",
    meta: { title: "systemManagement", icon: 'img-系统管理1.png', langKey: 'systemManagement' },
    children: [
      {
        path: "systemInfo",
        component: () => import("@/views/system/systemInfo/index.vue"),
        name: "systemInfo",
        meta: { title: "systemInfo", langKey: 'systemInfo' }
      },
      {
        path: "systemConfig",
        component: () => import("@/views/system/systemConfig/index.vue"),
        name: "systemConfig",
        meta: { title: "systemConfig", langKey: 'systemConfig' }
      }
    ]
  },
  {
    path: "/AppConfig",
    component: Layout,
    name: "AppConfig",
    meta: { title: "AppConfig", icon: 'img-应用配置1.png', langKey: 'AppConfig' },
    children: [
      {
        path: "IEC104",
        component: emptyCom,
        name: "IEC104",
        meta: { title: "IEC104", langKey: 'IEC104' },
        children: [
          {
            path: "initConfig",
            component: () => import("@/views/system/appConfig/index.vue"),
            name: "initConfig",
            meta: { title: "初始化配置", langKey:'initConfig' }
          },
          {
            path: "channelConfig",
            component: () => import("@/views/system/appConfig/index.vue"),
            name: "channelConfig",
            meta: { title: "通道配置", langKey:'channelConfig' }
          },
          {
            path: "SharedMemConfig",
            component: () => import("@/views/system/appConfig/index.vue"),
            name: "SharedMemConfig",
            meta: { title: "共享内存配置", langKey:'SharedMemConfig' }
          },
          {
            path: "pointTableConfig",
            component: () => import("@/views/system/appConfig/index.vue"),
            name: "pointTableConfig",
            meta: { title: "点表配置", langKey:'pointTableConfig' }
          }
        ]
      }
    ]
  },
  {
    path: "/AppDebug",
    component: Layout,
    name: "AppDebug",
    meta: { title: "AppDebug", icon: 'img-应用调试1.png', langKey: 'AppDebug' },
    children: [
      {
        path: "IEC104",
        component: emptyCom,
        name: "IEC104",
        meta: { title: "IEC104", langKey: 'IEC104' },
        children: [
          {
            path: "AcquisitionChannel",
            component: () => import("@/views/system/appDebug/index.vue"),
            name: "AcquisitionChannel",
            meta: { title: "采集通道", langKey:'AcquisitionChannel' }
          },
          {
            path: "ForwardChannel",
            component: () => import("@/views/system/appDebug/index.vue"),
            name: "ForwardChannel",
            meta: { title: "转发通道", langKey:'ForwardChannel' }
          }
        ]
      }
    ]
  },
  {
    path: "/FileTransport",
    component: Layout,
    name: "FileTransport",
    meta: { title: "FileTransport", icon: 'img-文件传输1.png', langKey: 'FileTransport' },
    children: [
      {
        path: "/",
        component: () => import("@/views/system/fileUpload/index.vue"),
        name: "FileTransport",
        hidden:true,
        meta: { title: "", langKey: 'FileTransport' }
      }
    ]
  },
  {
    path: "/Log",
    component: Layout,
    name: "Log",
    meta: { title: "Log", icon: 'img-日志1.png', langKey: 'Log' },
    children: [
      {
        path: "/",
        component: () => import("@/views/system/Log/index.vue"),
        name: "Log",
        hidden:true,
        meta: { title: "", langKey: 'Log' }
      }
    ]
  }
];
export const highPermissionRoutes = [
  // {
  //   path: "/config",
  //   component: Layout,
  //   name:"config",
  //   meta: { title: "config", icon:'img-配置设置1.png',langKey:'config'},
  //   children:[
  //     {
  //       path: "dido",
  //       component: () => import("@/views/system/dido/index.vue"),
  //       name:"dido",
  //       meta: { title: "input&output", icon:'',langKey:'dido'},
  //     },
  //     {
  //       path: "alarmConfig",
  //       component: () => import("@/views/system/alarmConfig/index.vue"),
  //       name:"alarmConfig",
  //       meta: { title: "alarmConfig", icon:'',langKey:'alarmConfig'},
  //     },
  //   ]
  // }
  
]
// 需要通过permission来判断权限 从而动态添加路由
export const asyncRoutes = [
  {
    path: "/configView",
    component: Layout,
    name: "configView",
    meta: { title: "配置设置", icon: 'img-配置设置1.png', langKey: 'dataView' },
    children: [
      {
        path: "southComm",
        component: emptyCom,
        name: "southComm",
        meta: { title: "南向通信", langKey: 'southComm' },
        redirect: '/configView/southComm/BusManagement',
        children: [
          {
            path: "BusManagement",
            component: () => import("@/views/system/southComm/BusManagement/index.vue"),
            name: "BusManagement",
            meta: { title: "总线管理", langKey: 'BusManagement' }
          },
          {
            path: "SlaveStationManagement",
            component: () => import("@/views/system/southComm/SlaveStationManagement/index.vue"),
            name: "SlaveStationManagement",
            meta: { title: "从站管理", langKey: 'SlaveStationManagement' }
          },
          {
            path: "DataManagement",
            component: () => import("@/views/system/southComm/DataManagement/index.vue"),
            name: "DataManagement",
            meta: { title: "数据管理", langKey: 'DataManagement' }
          },
        ]
      },
      {
        path: "northComm",
        component: emptyCom,
        name: "northComm",
        meta: { title: "北向通信", langKey: 'northComm' },
        children: [
          {
            path: "BusManagement",
            component: () => import("@/views/system/northComm/BusManagement/index.vue"),
            name: "BusManagement",
            meta: { title: "总线管理", langKey: 'BusManagement' }
          },
          {
            path: "SlaveStationManagement",
            component: () => import("@/views/system/northComm/SlaveStationManagement/index.vue"),
            name: "SlaveStationManagement",
            meta: { title: "从站管理", langKey: 'SlaveStationManagement' }
          },
          {
            path: "DataManagement",
            component: () => import("@/views/system/northComm/DataManagement/index.vue"),
            name: "DataManagement",
            meta: { title: "数据管理", langKey: 'DataManagement' }
          },
        ]
      },
      {
        path: "cloudComm",
        component: cloudComm,
        name: "cloudComm",
        redirect: '/configView/cloudComm/DataConfiguration',
        meta: { title: "云端通信", langKey: 'cloudComm' },
        children: [
          {
            path: "DataConfiguration",
            component: () => import("@/views/system/DataConfiguration/index.vue"),
            name: "DataConfiguration",
            hidden: true,
            meta: { title: "云端通信", langKey: 'DataConfiguration', breadcrumb: false }
          },
          {
            path: "TemplateConfiguration",
            component: () => import("@/views/system/TemplateConfiguration/index.vue"),
            name: "TemplateConfiguration",
            hidden: true,
            meta: { title: "模板配置", langKey: 'TemplateConfiguration', breadcrumb: false }
          },
          {
            path: "TopologyConfig",
            component: () => import("@/views/system/TopologyConfig/index.vue"),
            name: "TopologyConfig",
            hidden: true,
            meta: { title: "拓扑配置", langKey: 'TopologyConfig', breadcrumb: false }
          },
          {
            path: "CommunicationLog",
            component: () => import("@/views/system/CommunicationLog/index.vue"),
            name: "CommunicationLog",
            hidden: true,
            meta: { title: "通信日志", langKey: 'CommunicationLog', breadcrumb: false }
          },

        ]
      },
      {
        path: "dataForward",
        component: emptyCom,
        name: "dataForward",
        meta: { title: "数据转发", langKey: 'dataForward' },
        children: [
          {
            path: "modbusForward",
            component: () => import("@/views/system/dataForward/modbusForward/index.vue"),
            name: "modbusForward",
            meta: { title: "modbus转发", langKey: 'modbusForward' }
          },
          {
            path: "southNorthForward",
            component: () => import("@/views/system/dataForward/southNorthForward/index.vue"),
            name: "southNorthForward",
            meta: { title: "南北转发", langKey: 'southNorthForward' }
          },
          {
            path: "southNorthCallBackConfig",
            component: () => import("@/views/system/dataForward/southNorthCallBackConfig/index.vue"),
            name: "southNorthCallBackConfig",
            meta: { title: "南北回调配置", langKey: 'southNorthCallBackConfig' }
          },
        ]
      },
      {
        path: "clusterConfig",
        component: emptyCom,
        name: "clusterConfig",
        meta: { title: "集群配置", langKey: 'clusterConfig' }
      },
      {
        path: "serviceConfig",
        component: emptyCom,
        name: "serviceConfig",
        meta: { title: "业务配置", langKey: 'serviceConfig' }
      },
      {
        path: "eventConfig",
        component: () => import("@/views/system/eventConfig/index.vue"),
        name: "eventConfig",
        meta: { title: "事件配置", langKey: 'eventConfig' }
      },
      {
        path: "intranetPenetration",
        component: () => import("@/views/system/intranetPenetration/index.vue"),
        name: "intranetPenetration",
        meta: { title: "内网穿透", langKey: 'intranetPenetration' }
      },
      {
        path: "TCPProxy",
        component: () => import("@/views/system/TCPProxy/index.vue"),
        name: "TCPProxy",
        meta: { title: "TCP代理", langKey: 'TCPProxy' }
      },
      {
        path: "VCP",
        component: () => import("@/views/system/VCP/index.vue"),
        name: "VCP",
        meta: { title: "虚拟串口", langKey: 'VCP' }
      },
      {
        path: "serialPortTerminal",
        component: () => import("@/views/system/serialPortTerminal/index.vue"),
        name: "serialPortTerminal",
        meta: { title: "串口终端", langKey: 'serialPortTerminal' },

      },
      {
        path: "TcpTerminal",
        component: () => import("@/views/system/packConfig/index.vue"),
        name: "TcpTerminal",
        meta: { title: "TCP终端", langKey: 'TcpTerminal' },
        children: [
          {
            path: "serviceTerminal",
            component: () => import("@/views/system/packConfig/index.vue"),
            name: "serviceTerminal",
            meta: { title: "服务端模拟", langKey: 'serviceTerminal' }
          },
          {
            path: "clientTerminal",
            component: () => import("@/views/system/packConfig/index.vue"),
            name: "clientTerminal",
            meta: { title: "客户端模拟", langKey: 'clientTerminal' }
          },
        ]
      },
      {
        path: "hardwareSettings",
        component: () => import("@/views/system/packConfig/index.vue"),
        name: "hardwareSettings",
        meta: { title: "硬件设置", langKey: 'hardwareSettings' },
        children: [
          {
            path: "networkCardConfig",
            component: () => import("@/views/system/packConfig/index.vue"),
            name: "networkCardConfig",
            meta: { title: "网卡配置", langKey: 'networkCardConfig' }
          },
          {
            path: "timeConfig",
            component: () => import("@/views/system/packConfig/index.vue"),
            name: "timeConfig",
            meta: { title: "时间配置", langKey: 'timeConfig' }
          },
          {
            path: "processManage",
            component: () => import("@/views/system/packConfig/index.vue"),
            name: "processManage",
            meta: { title: "进程管理", langKey: 'processManage' }
          },
          {
            path: "performanceManage",
            component: () => import("@/views/system/packConfig/index.vue"),
            name: "performanceManage",
            meta: { title: "性能管理", langKey: 'performanceManage' }
          },
          {
            path: "bridgeConfig",
            component: () => import("@/views/system/packConfig/index.vue"),
            name: "bridgeConfig",
            meta: { title: "网桥配置", langKey: 'bridgeConfig' }
          },
        ]
      },
      {
        path: "testTool",
        component: () => import("@/views/system/packConfig/index.vue"),
        name: "testTool",
        meta: { title: "测试工具", langKey: 'testTool' },
        children: [
          {
            path: "serviceTerminal",
            component: () => import("@/views/system/packConfig/index.vue"),
            name: "serviceTerminal",
            meta: { title: "网卡配置", langKey: 'serviceTerminal' }
          },
          {
            path: "clientTerminal",
            component: () => import("@/views/system/packConfig/index.vue"),
            name: "clientTerminal",
            meta: { title: "时间配置", langKey: 'clientTerminal' }
          },
        ]
      }
    ]
  },
  { path: '*', redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由的方法
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
