import React,{Component} from 'react';
import {Button,WingBlank} from 'antd-mobile'
class NotFound extends Component{
  render(){
    return (
      <WingBlank>
        <h2 style={{textAlign:'center',marginTop: 200,marginBottom:100}}>抱歉，找不到该页面!</h2>
        <Button type='primary' onClick={()=>this.props.history.replace('/')}>回到首页</Button>
      </WingBlank>
    )
  }
}
export default NotFound;