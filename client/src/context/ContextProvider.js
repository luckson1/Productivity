import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [team, setTeam] = useState([]);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState(
    localStorage.getItem("ThemeColor") ?? "#03C9D7"
  );
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("ThemeColor") ?? "Light"
  );
  const [themeSettings, setThemeSettings] = useState(false);
  const [selectedBug, setSelectedBug] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const [showNavBar, setShowNavBar] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [bugs, setBugs] = useState([]);

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
        selectedBug,
        setSelectedBug,
        selectedTask,
         setSelectedTask,
        showNavBar,
        setShowNavBar,
        tasks,
        setTasks,
        bugs,
        setBugs,
        team,
        setTeam,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
