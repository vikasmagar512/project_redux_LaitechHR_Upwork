import * as types from './actionTypes';
import sessionApi from '../api/SessionApi';
import auth from '../auth/authenticator';


export function loginSuccess(response) {
  return {type: types.LOG_IN_SUCCESS,response:response}
}
export function loginFailure(response) {
  return {type: types.LOG_IN_FAILURE,response:response}
}

export function logOutUser() {
  auth.logOut();
  return {type: types.LOG_OUT}
}
export function loginUser(credentials) {
  return function(dispatch) {
   /* let flag = sessionApi.login(credentials);
    if (flag.success){
      console.log('response is ',flag);
      sessionStorage.setItem('jwt', true);
      dispatch(loginSuccess(flag));
    }else {
      dispatch(loginFailure(flag));
      console.log('response error is ',flag);
    }
    */
    return sessionApi.login(credentials).then(response => {
      // let flag = sessionApi.login(credentials);
      let flag = response;
      if (flag.success){
        sessionStorage.setItem('jwt', true);
        dispatch(loginSuccess(flag));
      }else {
        dispatch(loginFailure(flag));
      }
    }).catch(error => {
      throw(error);
    }); 
  };

}
