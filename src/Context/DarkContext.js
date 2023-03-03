import React, { createContext, useContext, useState } from "react";

export const darkProvider = createContext();
const DarkContext = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const value = { isDark, setIsDark };
  return (
    <darkProvider.Provider value={value}>{children}</darkProvider.Provider>
  );
};

export const useDark = () => {
  const dark = useContext(darkProvider);
  return dark;
};

export default DarkContext;
