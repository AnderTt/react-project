import React,{Component} from 'react';
import { Grid,List } from 'antd-mobile';
import PropTypes from 'prop-types'

class HeaderSelector extends Component{
  static propTypes = {
    setHeader : PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.HeaderList = [];
    for (let i = 0; i < 20; i++) {
      const text = `头像${i+1}`;
      const icon = require(`./images/${text}.png`);
      this.HeaderList.push({icon,text});
    }
  }
  state = {
    icon : null
  };
  selectHeader =({icon,text})=>{ //栅格中的每一元素，item={icon,text}
    this.setState({icon});
    this.props.setHeader(text)
  };

  render(){
    const {icon} = this.state;
    const head = icon ? <div>已选择头像:<img src={icon}/></div> : '请选择头像'
    return (
      <List renderHeader={() => head }>
        <Grid data={this.HeaderList} columnNum={5} onClick={this.selectHeader}/>
      </List>
    )
  }
}
export default HeaderSelector;