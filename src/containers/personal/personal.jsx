/*
用户个人中心路由组件
 */
//import不能写在const下面
import React from 'react';
import {Result, List, WhiteSpace, Button,Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {resetUser} from '../../redux/actions';

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends React.Component {
  logout = () => {
    Modal.alert('退出', '确认退出登录吗?', [
      {
        text: '取消',
        onPress: () => console.log('cancel')
      },
      {
        text: '确认',
        onPress: () => {
          // 删除cookie中的userid
          Cookies.remove('userid');
          // 重置state中的user
          this.props.resetUser()
        }
      }
    ])
  };
  render() {
    const {header,info,post,company,salary,username} = this.props.user;
    return (
      <div>
        <Result
          img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            { post ?<Brief>职位: {post}</Brief> : null }
            { info ?<Brief>简介: {info}</Brief> : null }
            { company ?<Brief>公司: {company}</Brief> : null }
            { salary ?<Brief>薪资: {salary}</Brief> : null }
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}
export default connect(
  state=>{
      console.log(state);//这里可以打印得到state的结构
      return { user: state.user}
    },
  {resetUser}
)(Personal);