import {combineReducers} from 'redux';
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_CHAT_MSGS,
  RECEIVE_CHAT_MSG
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

const initChat = {
  users : {},
  chatMsgs : [],
  unReadCount : 0
};
function chat(state=initChat,action) {
  switch (action.type){
    case RECEIVE_CHAT_MSGS :
      const {users,chatMsgs} = action.data;
      return {
        users,
        chatMsgs,
        unReadCount : 0
      } ;
    case RECEIVE_CHAT_MSG :
      const chatMsg = action.data;
      return {
        users : state.users,
        chatMsgs : [...state.chatMsgs,chatMsg],
        unReadCount : 0
      }  ;
    default :
      return state;
  }
}
export default combineReducers({
  user,
  userList,
  chat
})
// 1. 向外暴露是一个整合后的reducer函数: function (state, action)
// 2. state的结构为: {user: user(), userList: userList()}
