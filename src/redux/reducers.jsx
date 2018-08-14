import {combineReducers} from 'redux';
import {AUTH_SUCCESS,ERROR_MSG} from './action-types'
console.log(1111)
let initState={
  username : '',
  type : '',
  msg : '',
  redirectTo : ''
};

function user(state=initState,action) {
  switch (action.type){
    case AUTH_SUCCESS :
      const user = action.data;
      console.log(user,'---1');
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