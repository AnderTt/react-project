import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route} from 'react-router-dom';
import {Provider} from 'react-redux'

import login from './containers/login/Login'
import register from './containers/register/Register'
import main from './containers/main/Main'
import store from './redux/store'

import './assets/css/index.less'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component={login} />
        <Route path='/register' component={register} />
        <Route component={main} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root'));