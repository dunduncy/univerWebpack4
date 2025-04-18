let Socket = null
let setIntervalWesocketPush = null
const socketUrl = 'ws:127.0.0.1:8999'  // socket连接地址
/**
 * 建立websocket连接
 * @param {string} url ws地址
 */

export const createSocket = (Socket,socketUrl,setIntervalWesocketPush) => {
  Socket && Socket.close()
  if (!Socket) {
    console.log('建立websocket连接')
      Socket = new WebSocket(socketUrl)
      Socket.onopen = onopenWS
      Socket.onmessage = onmessageWS
      Socket.onerror = onerrorWS
      Socket.onclose = oncloseWS
  } else {
    console.log('websocket已连接')
  }
}
 
/**打开WS之后发送心跳 */
const onopenWS = () => {
  // sendPing()
}
 
/**连接失败重连 */
const onerrorWS = () => {
  Socket.close()
  clearInterval(setIntervalWesocketPush)
  console.log('连接失败重连中')
  if (Socket.readyState !== 3) {
    Socket = null
    createSocket(socketUrl)
  }
}
 
/**WS数据接收统一处理 */
export const onmessageWS = e => {
  window.dispatchEvent(new CustomEvent('onmessageWS', {
    detail: {
      data: e.data
    }
  }))
}

/**
 * 发送数据但连接未建立时进行处理等待重发
 * @param {any} message 需要发送的数据
 */
const connecting = message => {
  setTimeout(() => {
    if (Socket.readyState === 0) {
      connecting(message)
    } else {
      Socket.send(JSON.stringify(message))
    }
  }, 1000)
}
 
/**
 * 发送数据
 * @param {any} message 需要发送的数据
 */
export const sendWSPush = message => {
  console.log(message)
  console.log(Socket)
  if (Socket !== null && Socket.readyState === 3) {
    Socket.close()
    createSocket(socketUrl)
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(message))
  } else if (Socket.readyState === 0) {
    connecting(message)
  }
}
 
 
/**断开重连 */
const oncloseWS = () => {
  console.log('websocket已断开')
  Socket = null
  /*clearInterval(setIntervalWesocketPush)
  console.log('websocket已断开....正在尝试重连')
  if (Socket.readyState !== 2) {
    Socket = null
    createSocket()
  }*/
}

export const closeWs = ()=>{
    Socket.close()
}

/**
 * 
 * @param {number} time 心跳间隔毫秒 默认 5000
 * @param {string} ping 心跳名称 默认字符串 ping
 */
export const sendPending = (time=5000,ping='ping')=>{
    clearInterval(setIntervalWesocketPush)
    Socket.send(JSON.stringify({'event':"heart"}))
    setIntervalWesocketPush = setInterval(() => {
        Socket.send(JSON.stringify({'event':'heart'}))
    },time)
}
createSocket()