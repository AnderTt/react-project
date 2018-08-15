import React,{Component} from 'react';
import {connect} from 'react-redux'
class LaoBan extends Component{
  render(){
    return (
      <div>LaoBan</div>
    )
  }
}
export default connect(
  state =>({}),
  {}
)(LaoBan);