import React,{Component} from 'react';
import {NavBar,WhiteSpace,InputItem,WingBlank,List,Radio,Button} from 'antd-mobile';

import Logo from '../../components/logo/Logo'
const Item = List.Item;

class Register extends Component{
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
            <InputItem type='password' placeholder='请确认密码' >确认密码</InputItem>
            <WhiteSpace/>
            <Item>
              <span>用户类型:</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio>老板</Radio>
            </Item>
            <WhiteSpace/>
            <Button type='primary'>注册</Button>
            <WhiteSpace/>
            <Button>已有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default Register;