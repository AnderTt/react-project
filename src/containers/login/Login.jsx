import React,{Component} from 'react';
import {NavBar,WhiteSpace,InputItem,WingBlank,List,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/Logo'
import {login} from '../../redux/actions'
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
    this.props.login(this.state)
  };
  //设置状态
  handleChange =(name,val)=>{
    this.setState({
      [name] : val
    })
  };
  render(){
    const {redirectTo} = this.props.user;
    // 判断是否需要自动跳转
    if(redirectTo) {
      return <Redirect to={redirectTo}/>  // 在render()中实现自动跳转指定路由
    }
    return (
      <div>
        <NavBar>登录</NavBar>
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

export default connect(
  state => ({user: state.user}),  // 向UI组件Login中传入哪些一般属性
  {login} // 向UI组件Login中传入哪些函数属性
  // 传给UI组件不是异步action函数本身, 而是包含分发异步action的一个新的函数
)(Login);