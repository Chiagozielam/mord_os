import React, { createContext, useContext } from "react";

const MemoryContext = createContext({});

export const useMemoryContext = () => {
  const allContextValues = useContext(MemoryContext)
  return {
    ...allContextValues
  }
}

export default MemoryContext;
