import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/actions';

import UserList from '../../components/user-list/userList';
class DaShen extends Component{
  componentDidMount(){
    // 分发异步action, 获取指定类型的用户列表
    this.props.getUserList('laoban')
  }
  render(){
    const {userList} = this.props;
    return (
     <UserList  userList={userList}/>
    )
  }
}
export default connect(
  state => {
    console.log(state,'0009');
      return {userList:state.userList}
    }
    ,
  {getUserList}
)(DaShen);