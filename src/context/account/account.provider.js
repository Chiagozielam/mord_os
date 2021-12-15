import React, { useReducer } from 'react'
import AccountContext from './acount.context'
import AccountReducer from './account.reducer'

import {
  LOAD_ACCOUNT,
  SAVE_ACCOUNT,
  GET_ACCOUNT_SETTINGS,
} from '../types'

const AccountProvider = ({ children }) => {

  const initialState = {
    settings: {
      background: "",
    },
    taskbarApps: [ 'notepad'],
    defaultApps: {
      '*': 'notepad',
    },
  }

  const [state, dispatch] = useReducer(AccountReducer, initialState)


  const loadAccount = (activeUser) => (
    dispatch({
      type: LOAD_ACCOUNT,
      payload: activeUser,
    })
  );
  
  const saveAccount = (activeUser) => (
    dispatch({
      type: SAVE_ACCOUNT,
      payload: activeUser,
    })
  );
  
  const getAccountSettings = () => (
    dispatch({
      type: GET_ACCOUNT_SETTINGS,
    })
  );
  
  

  return (
    <AccountContext.Provider
      value={{
        accountState: state,
        loadAccount,
        saveAccount,
        getAccountSettings,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}


export default AccountProvider;
