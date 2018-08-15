import {combineReducers} from 'redux';
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types';

import {getRedirectPath} from '../utils'
const initState={
  username : '',
  type : '',
  msg : '',
  redirectTo : ''
};

function user(state=initState,action) {
  switch (action.type){
    case AUTH_SUCCESS :
      const user = action.data;
      return {...user,redirectTo: getRedirectPath(user.type,user.header)} ;
    case ERROR_MSG :
      const msg = action.data;
      return {...state,msg};
    case RECEIVE_USER :
      return action.data;
    case RESET_USER :
      return {...initState, msg: action.data};
    default :
      return state;
  }
}
export default combineReducers({
  user
})
//state结构{user: user(),}