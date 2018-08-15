import React,{Component} from 'react';
import {NavBar,List,InputItem,Button} from 'antd-mobile';
import {updateUser} from '../../redux/actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector';

class LaoBanInfo extends Component{
  state = {
    header: '', // 头像名称
    info: '', // 职位简介
    post: '', // 职位名称
    company: '', // 公司名称
    salary: '' // 工资
  };
  setHeader = (header)=>{
    this.setState({header});
  };
  handleChange =(name,val)=>{
    this.setState({
      [name] : val,
    })
  };
  save = ()=>{
    this.props.updateUser(this.state)
  };
  render(){
    const {user} = this.props;
    // 如果用户信息已完善, 自动跳转到老板主界面
    if (user.header) {
      return <Redirect to='/laoban'/>
    }
    return (
      <div>
        <NavBar>老板完善信息</NavBar>
        <List>
          <HeaderSelector  setHeader={this.setHeader}/>
          <InputItem onChange={(val)=>this.handleChange('post',val)}>招聘职位：</InputItem>
          <InputItem onChange={(val)=>this.handleChange('company',val)}>公司名称：</InputItem>
          <InputItem onChange={(val)=>this.handleChange('salary',val)}>职位薪资：</InputItem>
          <InputItem onChange={(val)=>this.handleChange('info',val)}>职位要求：</InputItem>
        </List>
        <Button type='primary' onClick={this.save}> 保存</Button>
      </div>
    )
  }
}
//connect 建立外部state到内部props的映射关系
export default connect(
  state=>({user : state.user}),
  {updateUser}
)(LaoBanInfo);