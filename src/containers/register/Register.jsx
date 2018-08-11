import React,{Component} from 'react';
import {NavBar,WhiteSpace,InputItem,WingBlank,List,Radio,Button} from 'antd-mobile';

import Logo from '../../components/logo/Logo'
const Item = List.Item;

class Register extends Component{
  //初始化状态
  state = {
    username : '',
    password : '',
    rePassword : '',
    type : 'laoban'
  };
  //跳转到登录页面
  toLogin = ()=>{
    this.props.history.replace('/login')
  };
  //请求注册
  register = ()=>{
    console.log(this.state);
  };
  //设置状态
  handleChange =(name,val)=>{
      this.setState({
        [name] : val
      })
  };
  render(){
    const {type} = this.state;
    return (
      <div>
        <NavBar>注册</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem type='text' placeholder='请输入用户名'  onChange={(val) => this.handleChange('username', val)}>用&nbsp;&nbsp;户&nbsp;&nbsp;名</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码' onChange={(val)=>this.handleChange('password',val)}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请确认密码' onChange={(val)=>this.handleChange('rePassword',val)}>确认密码</InputItem>
            <WhiteSpace/>
            <Item>
              <span>用户类型:</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='laoban'} onChange={(val)=>this.handleChange('type','laoban')}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='dashen'} onChange={(val)=>this.handleChange('type','dashen')}>老板</Radio>
            </Item>
            <WhiteSpace/>
            <Button type='primary'>注册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default Register;