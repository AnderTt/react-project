import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile'

import DashenInfo from '../dashen-info/dashen-info';
import LaobanInfo from '../laoban-info/laoban-info';
import Laoban from '../laoban/laoban';
import Dashen from '../dashen/dashen';
import Message from  '../message/message';
import Personal from '../personal/personal';
import NotFound from '../../components/not-found/notFound';
import {getRedirectPath} from '../../utils'
import {getUser} from "../../redux/actions";
import NavFooter from '../../components/nav-footer/navFooter';
import Chat from '../../containers/chat/chat'



class Main extends Component{

  /*
  a = {}  // 给组件的实例对象添加属性,  后面访问: this.a
  static b = {}  给组件类对象添加属性, 后面访问: Main.b
   */

  /*
  1. 实现自动登陆
    1). 如果cookie中没有userid, 直接跳转到登陆页面
    2). state中的user中没有_id, 发请求获取当前用户信息
  2. 如果当前已经登陆, 且请求的是根路径 : /
  1). 根据当前用户的相关信息, 自动跳转对应的界面
 */
  // 给组件对象添加属性
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ];
  componentDidMount() {
    // 只有当前面登陆过, 但当前还没有登陆, 才去发请求获取用户信息
    const userid = Cookies.get('userid');
    console.log(userid,'cookies');
    const {user} = this.props;
    console.log(user);
    if(userid && !user._id) {
      console.log(this.props);
      this.props.getUser()
    }
  }
  render(){
    // 1). 如果cookie中没有userid, 直接跳转到登陆页面
    const userid = Cookies.get('userid');
    if(!userid) {
      return <Redirect to='/login'/>
    }
    // 2). state中的user中没有_id, 发请求获取当前用户信息
    const {user} = this.props;
    if(!user._id) { // 不能在render中发送ajax请求
      return <div>LOADING...</div>
    }
    // 得到当前请求的path
    const path = this.props.location.pathname;
    // 3). 判断请求的路径是否是/
    if(path==='/') {
      // 根据当前用户的相关信息, 自动跳转对应的界面
      return <Redirect to={getRedirectPath(user.type, user.header)}/>
    }

    // 保存一隐藏nav的标识数据: hide: true
    //如果不做下面的重定向，有可能会造成混乱，比如大神用户会访问到大神的列表
    //所以我们要针对其输入的路径做出判断，重定向
    if(user.type==='laoban') {
      if(path==='/dashen') { // 如果是老板, 请求/dashen, 自动跳转到/laoban
        return <Redirect to='/laoban'/>
      }
      this.navList[1].hide = true
    } else {
      if(path==='/laoban') { // 如果是大神, 请求/laoban, 自动跳转到/dashen
        return <Redirect to='/dashen'/>
      }
      this.navList[0].hide = true
    }

    // 得到当前导航的信息对象
    // find()返回的是第一次回调函数返回true的对应的元素, 如果没有一匹配的, 返回undefined
    const currentNav = this.navList.find((nav, index) => nav.path===path);
    return (
      <div>
        {currentNav ? <NavBar className='fixed-top'>{currentNav.title}</NavBar> : ''}
        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>

          <Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
          <Route path='/chat/:userid' component={Chat}/>
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={this.navList} /> : null}
      </div>
    )
  }
}
export default connect(
  state=>({user: state.user}),
  {getUser}
)(Main);

/*
* 实现自动登录
* 1.真正登录了：a.状态里面有信息，b,cookie里面有信息
* 2。实现自动登录：自动发请求，从服务器把用户的信息拿了出来，放在state中
* 3.前提必须要有cookie,且由userid,只能前面的登录过才能实现自动登录
* 1）cookie中没有userid，直接跳转到登录页面
* 2）state中的user中没有_id （获取state说明要与redux通信，包装成容器组件）,说明当前没有登录，发请求获取当前（根据userid去找）用户信息
* */