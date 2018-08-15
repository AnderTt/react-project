/*接口函数的模块*/
import ajax from './ajax';
//注册接口函数
export const reqRegister=({username,password,type}) => ajax('/register',{username,password,type},'POST');
//登录接口函数
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST');
//更新用户信息
export const reUpdateUser =(user) => ajax('/update',user,'POST');
// 查看用户信息(根据cookie)
export const reqUser =() => ajax('/user');