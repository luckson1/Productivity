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
  const [showModal, setShowModal] = useState(false);
  const [isExpense, setIsExpense] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentEntry, setCurrentEntry] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [showCart, setShowCart] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [revealPassword, setRevealPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [shoppingStats, setShoppingStats] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);

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
        showModal,
        setShowModal,
        isExpense,
        setIsExpense,
        showDeleteModal,
        setShowDeleteModal,
        isEdit,
        setIsEdit,
        currentEntry,
        setCurrentEntry,
        currentItem,
        setCurrentItem,
        showCart,
        setShowCart,
        showNavBar,
        setShowNavBar,
        revealPassword,
        setRevealPassword,
        isSignUp,
        setIsSignUp,
        isOpenMenu,
        setIsOpenMenu,
        showProfileModal,
        setShowProfileModal,
        tasks,
        setTasks,
        setShoppingItems,
        shoppingItems,
        setShoppingStats,
        shoppingStats,
        incomes,
        setIncomes,
        expenses,
        setExpenses,
        bugs,
        setBugs,
        showInfoModal,
        setShowInfoModal,
        team,
        setTeam,
        showCreateTeamModal,
        setShowCreateTeamModal,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
