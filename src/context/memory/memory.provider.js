import React, { useReducer } from 'react'
import MemoryContext from './memory.context'
import MemoryReducer from './memory.reducer'
import { START_NEW_PROGRAM, TERMINATE_PROGRAM } from '../types'

const AuthProvider = ({ children }) => {

  const initialState = {
    appsInstances: {},
    programsData: {},
  }

  const [state, dispatch] = useReducer(MemoryReducer, initialState)
  
  const startNewProgram = (app, metadata) => (
    dispatch({
      type: START_NEW_PROGRAM,
      payload: { app, metadata },
    })
  );
  
  const terminateProgram = (pId) => (
    dispatch({
      type: TERMINATE_PROGRAM,
      payload: pId,
    })
  );

  return (
    <MemoryContext.Provider
      value={{
        memoryState: state,
        startNewProgram,
        terminateProgram
      }}
    >
      {children}
    </MemoryContext.Provider>
  )
}

export default AuthProvider;
