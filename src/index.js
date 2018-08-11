import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route} from 'react-router-dom'

import login from './containers/login/Login'
import register from './containers/register/Register'
import main from './containers/main/Main'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path='./login' component={login} />
      <Route path='./register' component={register} />
      <Route component={main} />
    </Switch>
  </HashRouter>,
  document.getElementById('root'));