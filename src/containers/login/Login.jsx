import React,{Component} from 'react';
import {NavBar,WhiteSpace,InputItem,WingBlank,List,Radio,Button} from 'antd-mobile';

import Logo from '../../components/logo/Logo'
const Item = List.Item;
class Login extends Component{
  render(){
    return (
      <div>
        <NavBar>注册</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem type='text' placeholder='请输入用户名'>用&nbsp;&nbsp;户&nbsp;&nbsp;名</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码' >密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</InputItem>
            <WhiteSpace/>
            <Button type='primary'>登录</Button>
            <WhiteSpace/>
            <Button>没有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default Login;