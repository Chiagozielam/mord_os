import React, { createContext, useContext } from "react";

const AccountContext = createContext({});

export const useAccountContext = () => {
  const allContextValues = useContext(AccountContext)
  return {
    ...allContextValues
  }
}

export default AccountContext;
