import React, { useReducer, useContext } from 'react'
import AuthContext from './auth.context'
import AuthReducer from './auth.reducuer'
import { CHECK_USER_SESSION, CREATE_NEW_ACCOUNT, SIGN_IN, LOGOUT_USER } from '../types'

const AuthProvider = ({ children }) => {

  const initialState = {
    users: null,
    activeUser: null,
    success: false,
    error: null,
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const checkUserSession = () => (
    dispatch({
      type: CHECK_USER_SESSION
    })
  );
  
  const createNewAccount = (userDetails) => (
    dispatch({
      type: CREATE_NEW_ACCOUNT,
      payload: userDetails,
    })
  );
  
  const signInUser = (userIndex, password) => (
    dispatch({
      type: SIGN_IN,
      payload: { userIndex, password },
    })
  );
  
  const logOut = () => (
    dispatch({
      type: LOGOUT_USER,
    })
  );
  

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        checkUserSession,
        createNewAccount,
        signInUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
