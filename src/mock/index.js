//mock/index.js
import Mock from 'mockjs' //引入mockjs，npm已安装
import { Random,toJSONSchema } from 'mockjs' // 引入random对象,随机生成数据的对象，（与占位符@一样）
Mock.setup({
  timeout:1000  //设置请求延时时间
})
const getMonthPrice = function(option){ //定义请求数据方法
  let data1 = []
  let xData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
  let arr = ['谷','平','峰','尖',]
  for (let index = 0; index < arr.length; index++) {
    let obj = {name:arr[index],list:[]}
    for (let i = 0; i < xData.length; i += 1) {
      const o = {  //mockjs模拟随机生成数据，生成20条
        name:xData[i],
        value:(Math.random()*10).toFixed(1)
      }
      obj.list.push(o)
    }
    data1.push(obj)
  }
  return{
    code:1,
    data:{
      xData,
      data:data1
    }
  }
}
const getMonthPriceTableData = function(option){ //定义请求数据方法
  let xData = ['','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
  let arr = ['谷','平','峰','尖','最大需量','变压器容量']
  let tableData = []
  let columns = []
  arr.forEach(value=>{
    let kk = []
    let obj = {}
    xData.forEach((month,index)=>{
      if(index==0){
        obj['month'+index] = value
      }else{
        obj['month'+index] = (Math.random()*10).toFixed(1)
      }
    })
    tableData.push(obj)
  })
  xData.forEach((value,index)=>{
    columns.push({
      label:value,
      key:'month'+index,
      prop:'month'+index
    })
  })
  return{
    code:1,
    data:{tableData,columns}
  }
}
const getHourPrice = function(option){ //定义请求数据方法
  let data = []
  let arr = ['谷','尖','峰']
  let xData = []
  arr.forEach((name,i)=>{
    let o = {name:name,list:[]}
    for (let index = 0; index < 25; index++) {
      if(i==0){
        xData.push(index+':'+'00')
      }
      let value = null
      if(name=='谷'){
        if((index>=0&&index<=9)||(index>=12&&index<=14)||(index>=22&&index<=24)){
          value = 0.93
        }else{
          value = null
        }
      }else if(name=='峰'){
        if((index>=9&&index<=11)||(index>=15&&index<=18)){
          value = 1.89
        }else{
          value = null
        }
      }else{
        if((index>=19&&index<=21)){
          value = 1.94
        }else{
          value = null
        }
      }
      let obj = {
        name:index+':'+'00',
        value:value
      }
      o.list.push(obj)
    }
    data.push(o)
  })
  
  return{
    code:1,
    data:{
      data,
      xData
    }
  }
}
const regions = function (opt) {
  console.log("opt",opt);
  let articles = [];
  for(let i=0;i<10;i++){
    let newArticleObject = {
      title:Random.csentence(5,30),
      thumbnail_pic_s:Random.dataImage('150x50','微信:gis-dajianshi'),
      author_name:Random.range(10),
      date:Random.date()+''+Random.time(),
      email:Random.email(),
      name:Random.cname()
    }
    articles.push(newArticleObject)
  }
  return {
    data:articles
  }
}
Mock.mock('/api/getMonthPrice',/post|get/i,getMonthPrice)//当post 或者get 请求到news路由时MOCK会拦截请求并返回
Mock.mock('/api/getMonthPriceTableData', /post|get/i,getMonthPriceTableData) //调用模拟数据方法
Mock.mock('/api/getHourPrice', /post|get/i,getHourPrice) //调用模拟数据方法