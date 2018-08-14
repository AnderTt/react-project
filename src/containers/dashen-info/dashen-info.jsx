import React,{Component} from 'react';
import {connect} from 'react-redux'
import {NavBar,List,InputItem,Button,TextareaItem} from 'antd-mobile';
import {updateUser} from '../../redux/actions';

import HeaderSelector from '../../components/header-selector/header-selector'
class DaShenInfo extends Component{
  state = {
    header: '', // 头像名称
    info: '', // 个人简介
    post: '', // 求职岗位
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
    return (
      <div>
        <NavBar>大神完善信息</NavBar>
        <List>
          <HeaderSelector setHeader={this.setHeader}  />
          <InputItem onChange={(val)=>this.handleChange('post',val)}>求职岗位：</InputItem>
          <TextareaItem
            title="个人介绍："
            row={3}
            onChange={(val)=>this.handleChange('info',val)}
          />
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
)(DaShenInfo);