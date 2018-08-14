import React,{Component} from 'react';
import {NavBar,List,InputItem,Button} from 'antd-mobile';

import HeaderSelector from '../../components/header-selector/header-selector';

class LaoBanInfo extends Component{
  render(){
    return (
      <div>
        <NavBar>老板完善信息</NavBar>
        <List>
          <HeaderSelector />
          <InputItem>招聘职位：</InputItem>
          <InputItem>公司名称：</InputItem>
          <InputItem>职位薪资：</InputItem>
          <InputItem>职位要求：</InputItem>
        </List>
        <Button type='primary'> 保存</Button>
      </div>
    )
  }
}
export default LaoBanInfo;