/*
包含n个action的模块(本质是创建action的action creator)
1. 同步action
2. 异步action
 */
import {reqRegister,reqLogin} from '../api';
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types';
import ajax from "../api/ajax";

// 注册/登陆成功的同步action
const authSuccess = (user)=>({ type : AUTH_SUCCESS , data : user});
// 注册/登陆失败的同步action
const errorMsg = (msg)=>({ type : ERROR_MSG , data : msg});
//接受用户
const receiveUser =(user) =>({ type : RECEIVE_USER , data : user});
//重置用户
const resetUser =(msg) => ({ type : RESET_USER , data : msg});

//注册的异步
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
      console.log(user);
      // 分发同步action(成功)
      dispatch(authSuccess(user));
    }else{//注册失败
      const msg = result.msg;
      // 分发同步action(失败)
      dispatch(errorMsg(msg));
    }
  }
}
//登录的异步
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
      // 分发同步action(成功)
      dispatch(authSuccess(user));
    }else{//登录失败
      const msg = result.msg;
      // 分发同步action(失败)
      dispatch(errorMsg(msg));
    }
  }
}
//更新信息的异步
export function updateUser(user) {
  return async dispatch=>{
    const response = await ajax('/update',user,'POST');
    const result = response.data;
    console.log(result,'000');
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


