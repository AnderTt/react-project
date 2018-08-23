/*
包含n个action的模块(本质是创建action的action creator)
1. 同步action
2. 异步action
 */
// 引入客户端io
import io from 'socket.io-client'
import {
  reqRegister,
  reqLogin,
  reUpdateUser,
  reqUser,
  reqUserList,
  reqMsgList,
  reqReadMsg
} from '../api';

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_CHAT_MSGS,
  RECEIVE_CHAT_MSG,
  MSG_READ
} from './action-types';


//同步action
// 注册/登陆成功的同步action
const authSuccess = (user)=>({ type : AUTH_SUCCESS , data : user});
// 注册/登陆失败的同步action
const errorMsg = (msg)=>({ type : ERROR_MSG , data : msg});
//接受用户
const receiveUser =(user) =>({ type : RECEIVE_USER , data : user});
//重置用户
export const resetUser =(msg) => ({ type : RESET_USER , data : msg});
//接受用户列表
const receiveUserList = (userList) => ({ type : RECEIVE_USER_LIST , data : userList});
//获取当前用户的消息列表的同步action
const receiveChatMsgs = ({users,chatMsgs,meId}) =>({ type : RECEIVE_CHAT_MSGS, data : {users,chatMsgs,meId}});
//获取一条新的消息的同步action，我们上线之后也有可能收到新的消息，所以不能只获取消息列表
//还需要获取新的消息
const receiveChatMsg = (chatMsg,meId) =>({ type : RECEIVE_CHAT_MSG, data : {chatMsg,meId}});
//获取未读消息的数量
const msgRead = ({count, targetId, meId}) =>({ type : MSG_READ, data : {count, targetId, meId}});

//异步action
//注册的异步action
export function register({username,password,rePassword,type}) {
  //执行异步，发送ajax请求，得到结果，分发同步action
 //前台表单验证-同步
  if(!username) {
    return errorMsg('请输入用户名');
  }else if(!password) {
    return errorMsg('请输入密码');
  }else if(password!==rePassword){
    return errorMsg('两次密码必须一致');
  }else if(!type){
    return errorMsg('请选择类型');
  }

  return async  dispatch =>{
    /*reqRegister({username,password,type})
      .then(res=>{
        const result = res.data;// {code: 0, data: user} | {code: 1, msg: 'xxx'}
        if(result.code===0){//注册成功
            const user = result.data;
            console.log(user);
          // 分发同步action(成功)
            dispatch(authSuccess(user));
        }else{//注册失败
          const msg = result.msg;
          // 分发同步action(失败)
          dispatch(errorMsg(msg));
        }
      })*/
    const response = await reqRegister({username,password,type});
    const result = response.data;
    if(result.code===0){//注册成功
      const user = result.data;
      getChatMsgs(dispatch,user._id);
      // 分发同步action(成功)
      dispatch(authSuccess(user));
    }else{//注册失败
      const msg = result.msg;
      // 分发同步action(失败)
      dispatch(errorMsg(msg));
    }
  }
}
//登录的异步action
export function login({username,password}) {
  //执行异步，发送ajax请求，得到结果，分发同步action
  //前台表单验证-同步
  if(!username) {
    return errorMsg('请输入用户名');
  }else if(!password) {
    return errorMsg('请输入密码');
  }
  return async dispatch =>{
    const response = await reqLogin(username,password);
    const result = response.data;
    if(result.code===0){//登录成功
      const user = result.data;
      getChatMsgs(dispatch,user._id);
      // 分发同步action(成功)
      dispatch(authSuccess(user));
    }else{//登录失败
      const msg = result.msg;
      // 分发同步action(失败)
      dispatch(errorMsg(msg));
    }
  }
}
//更新信息的异步action
export function updateUser(user) {
  return async dispatch=>{
    const response = await reUpdateUser(user);
    const result = response.data;
    if(result.code===0){
      const user = result.data;
      console.log(user,'001');
      dispatch(receiveUser(user))
    }else{
      const msg = result.msg;
      dispatch(resetUser(msg))
    }
   }
}

//获取用户信息的异步action
export function getUser() {
  return async dispatch=>{
    const response = await reqUser();
    const result = response.data;
    if(result.code===0){
      const user = result.data;
      console.log(user);
      getChatMsgs(dispatch,user._id);
      dispatch(receiveUser(user))
    }else{
      dispatch(resetUser(result.msg))
    }
  }
}
//查看用户列表的异步action
export function getUserList(type) {
  return async dispatch=>{
    const response = await reqUserList(type);
    console.log(response);
    const result = response.data;
    if(result.code===0){
        dispatch(receiveUserList(result.data));
    }else {
      dispatch(resetUser(result.msg));
    }
  }
}

//发送聊天消息的异步action
/*
初始化客户端的socketIO
只有当登陆成功后才能调用
只用执行一次
 */
function initSocketIO(dispatch,meId){
  //因为meId所处的位置在闭包里面，当我们切换用户的时候
  io.meId = meId;
   /* 单例对象: 只有一个实例(socket)
    1. 创建对象前: 判断对象不存在
    2. 创建对象后: 保存对象*/
  //这里连接服务，得到代表连接的socket对象只需执行一次，而io对象只创建一次，所以我们可以把socket挂载在io对象上
  if(!io.socket){
    // 连接服务器, 得到代表连接的socket对象
    io.socket = io('ws://localhost:4000');
    //绑定recieveMsg监听，监听服务器给浏览器发送的消息
    io.socket.on('receiveMsg',(chatMsg)=>{
      console.log(chatMsg,'000000000');
      //只有当是我发的或者是发给我的消息, 分发一个接收chatMsg的同步action
      if(chatMsg.from===io.meId || chatMsg.to===io.meId){
        dispatch(receiveChatMsg(chatMsg,io.meId))
      }
    });
  }
}

export function sendMsg({content,from,to}) {
  return dispatch=>{
    //向服务器发送消息
    io.socket.emit('sendMsg',{content,from,to});
    console.log('浏览器端向服务器发送消息:',{content,from,to});
  }
}

//获取当前用户的消息列表
//1.注册成功，登录后获取
//2.登录后获取
//3，自动登陆后，获取
//需要在这三个时刻获取，所以不能直接暴露
async function getChatMsgs(dispatch,meId) {
    initSocketIO(dispatch,meId);
    const response = await reqMsgList();
    console.log(response);
    const result = response.data;
    if(result.code===0){
      const {users,chatMsgs} = result.data;
      dispatch(receiveChatMsgs({users,chatMsgs,meId}))
    }
}

/*
更新未读消息为已读的异步action
 */

export function readMsg(targetId, meId) {
  return async dispatch => {
    const response = await reqReadMsg(targetId);
    const result = response.data;
    if(result.code===0) {
      const count = result.data;
      dispatch(msgRead({count, targetId, meId}))
    }
  }
}

/*
async/await?
1. 作用?
    简化pormise的使用(不用再使用then()来指定成功或失败的回调函数)
    以同步编码的方式实现异步流程(没有回调函数)
2. 哪里使用await?(在某条语句的左侧加)
    返回promise对象的语句, 为了直接得到异步返回的结果, 而不是promsie对象
3. 哪里使用async? (在某个函数定义左侧)
    使用了await的函数
 */