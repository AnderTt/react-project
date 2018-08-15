import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile'
class NavFooter extends Component{
  static propTypes = {
    navList : PropTypes.array.isRequired
  };
  render(){
    const {navList} = this.props;
    return (
      <TabBar>
        {
          navList.map((nav,index)=>{
            return <TabBar.Item key={index}
                      title = {nav.title}
                      icon = {{uri: require(`./images/${nav.icon}.png`)}}
            />
          })
        }
      </TabBar>
    )
  }
}
export default NavFooter;