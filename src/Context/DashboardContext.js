import React, { createContext, useState } from "react";

export const dashboardProvider = createContext();
const DashboardContext = ({ children }) => {
    const [showFullMenu, setShowFullMenu] = useState(false);
  const value = { showFullMenu, setShowFullMenu };
  return (
    <dashboardProvider.Provider value={value}>
      {children}
    </dashboardProvider.Provider>
  );
};

export default DashboardContext;