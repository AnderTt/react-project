/*
包含n个action的模块(本质是创建action的action creator)
1. 同步action
2. 异步action
 */
import {reqRegister,reqLogin} from '../api';
import {AUTH_SUCCESS,ERROR_MSG} from './action-types';

// 注册/登陆成功的同步action
const authSuccess = (user)=>({ type : AUTH_SUCCESS , data : user});
// 注册/登陆失败的同步action
const errorMsg = (msg)=>({ type : ERROR_MSG , data : msg});

//注册的异步
export function register({username,password,type}) {//执行异步，发送ajax请求，得到结果，分发同步action
  return dispatch =>{
    reqRegister({username,password,type})
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
      })
  }
}
//登录的异步
export function login({username,password}) {//执行异步，发送ajax请求，得到结果，分发同步action
  return dispatch =>{
    reqLogin(username,password)
      .then(response=>{
        const result = response.data;// {code: 0, data: user} | {code: 1, msg: 'xxx'}
        if(result.code===0){//登录成功
          const user = result.data;
          // 分发同步action(成功)
          dispatch(authSuccess(user));
        }else{//登录失败
          const msg = result.msg;
          // 分发同步action(失败)
          dispatch(errorMsg(msg));
        }
      })
  }
}

