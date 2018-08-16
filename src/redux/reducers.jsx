import {combineReducers} from 'redux';
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from './action-types';

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
const initList = [];
function userList(state=initList,action) {
  switch (action.type){
    case RECEIVE_USER_LIST :
      return action.data;
    default :
      return state
  }
}
export default combineReducers({
  user,
  userList
})

// 1. 向外暴露是一个整合后的reducer函数: function (state, action)
// 2. state的结构为: {user: user(), userList: userList()}
