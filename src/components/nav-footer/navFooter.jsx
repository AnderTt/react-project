import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
class NavFooter extends Component{
  static propTypes = {
    navList : PropTypes.array.isRequired
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
            return <TabBar.Item key={index}
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