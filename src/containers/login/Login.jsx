import React,{Component} from 'react';
import {NavBar,WhiteSpace,InputItem,WingBlank,List,Radio,Button} from 'antd-mobile';

import Logo from '../../components/logo/Logo'
const Item = List.Item;
class Login extends Component{
  //初始化状态
  state = {
    username : '',
    password : '',
  };
  //跳转到注册页面
  toRegister = ()=>{
    this.props.history.replace('/register')
  };
  //请求登录
  login = ()=>{
    console.log(this.state);
  };
  //设置状态
  handleChange =(name,val)=>{
    this.setState({
      [name] : val
    })
  };
  render(){
    return (
      <div>
        <NavBar>注册</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem type='text' placeholder='请输入用户名' onChange={(val) => this.handleChange('username', val)}>用&nbsp;&nbsp;户&nbsp;&nbsp;名</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码' onChange={(val) => this.handleChange('password', val)} >密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登录</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>没有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default Login;