import React, { createContext, useContext } from "react";

const AuthContext = createContext({});

export const useAuthContext = () => {
  const allContextValues = useContext(AuthContext)
  return {
    ...allContextValues
  }
}

export default AuthContext;
