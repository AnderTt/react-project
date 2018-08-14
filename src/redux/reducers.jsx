import {combineReducers} from 'redux';
import {AUTH_SUCCESS,ERROR_MSG} from './action-types';

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
    default :
      return state
  }
}
export default combineReducers({
  user
})
console.log(user)