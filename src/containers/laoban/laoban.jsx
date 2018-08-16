import React,{Component} from 'react';
import {connect} from 'react-redux';
import UserList from '../../components/user-list/userList'
import {getUserList} from '../../redux/actions';
class LaoBan extends Component{
  componentDidMount(){
    // 分发异步action, 获取指定类型的用户列表
    this.props.getUserList('dashen')
  }
  render(){
    const {userList} = this.props;
    return (
      <UserList userList={userList} style={{marginTop: 50}}/>
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
)(LaoBan);