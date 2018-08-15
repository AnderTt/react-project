import React,{Component} from 'react';
import {connect} from 'react-redux'
class DaShen extends Component{
  render(){
    return (
      <div>dashen</div>
    )
  }
}
export default connect(
  state =>({}),
  {}
)(DaShen);