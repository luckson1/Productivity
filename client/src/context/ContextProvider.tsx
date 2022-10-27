import React, { createContext, useContext, useState } from "react";

const StateContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState(
    localStorage.getItem("ThemeColor") ?? "#03C9D7"
  );
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("ThemeColor") ?? "Light"
  );
  const [themeSettings, setThemeSettings] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("ThemeMode", e.target.value);
    setThemeSettings(false);
  };
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("ThemeColor", color);
    setThemeSettings(false);
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        currentColor,
        setCurrentColor,
        currentMode,
        setCurrentMode,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
        showNavBar,
        setShowNavBar,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
