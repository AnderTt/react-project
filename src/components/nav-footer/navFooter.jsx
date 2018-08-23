import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
class NavFooter extends Component{
  static propTypes = {
    navList : PropTypes.array.isRequired,
    unReadCount : PropTypes.number.isRequired
  };
  render(){
    //过滤掉navList中hide为true的元素
    const navList = this.props.navList.filter((nav)=> !nav.hide);
    //获取当前的path
    const path = this.props.location.pathname;
    return (
      <TabBar>
        {
          navList.map((nav,index)=>{
            const {unReadCount}= this.props;
            console.log(unReadCount,'000000');
            return <TabBar.Item key={index}
                      badge={nav.path==='/message' ?unReadCount : 0}
                      title = {nav.title}
                      icon = {{uri: require(`./images/${nav.icon}.png`)}}
                      selectedIcon = {{uri: require(`./images/${nav.icon}-selected.png`)}}
                      onPress={()=>{this.props.history.replace(nav.path)}}
                      selected={path===nav.path}

            />
          })
        }
      </TabBar>
    )
  }
}
export default withRouter(NavFooter);