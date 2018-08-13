import {combineReducers} from 'redux';
import {AUTH_SUCESS,ERROR_MSG} from './action-types'

const initState={
  username : '',
  type : '',
  msg : '',
  redirectTo : ''
};

function user(state=initState,action) {
  switch (action.type){
    case AUTH_SUCESS :
      const user = action.data;
      return {...user,redirectTo: '/'} ;
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