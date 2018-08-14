import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom'

import dashenInfo from '../dashen-info/dashen-info';
import laobanInfo from '../laoban-info/laoban-info';
class Main extends Component{
  render(){
    return (
      <div>
        <Switch>
          <Route path='/laobaninfo' component={laobanInfo}/>
          <Route path='/dasheninfo' component={dashenInfo}/>
        </Switch>
      </div>
    )
  }
}
export default Main;