import { createContext, useContext, useState } from "react";

const StateContext = createContext();
const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState)
    // const [isClosed, setIsClosed] = useState({})

    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor, setCurrentColor] = useState("#03C9D7")
    const [currentMode, setCurrentMode] = useState("Light")
    const [themeSettings, setThemeSettings] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isExpense, setIsExpense] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [currentTask, setCurrentTask] = useState()
    const [currentItem, setCurrentItem] = useState()
    const [showCart, setShowCart] = useState(false)
    const [showNavBar, setShowNavBar] = useState(true)
    const [reveal, setReveal] = useState(false)
    const [isSignUp, setIsSignUp]=useState(true)
   const  [isOpenMenu, setIsOpenMenu]=useState(false)



    const setMode = (e) => { setCurrentMode(e.target.value); localStorage.setItem("ThemeMode", e.target.value); setThemeSettings(false) }
    const setColor = (color) => { setCurrentColor(color); localStorage.setItem("ThemeColor", color); setThemeSettings(false) }

    const handleClick = (clicked) => {setIsClicked({ ...initialState, [clicked]: true });console.log(clicked)}


    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
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
                currentTask, 
                setCurrentTask,
                currentItem, 
                setCurrentItem,
                showCart, 
                setShowCart,
                showNavBar, 
                setShowNavBar,
                reveal, 
                setReveal,
                isSignUp, 
                setIsSignUp,
                isOpenMenu, 
                setIsOpenMenu

        
           
            }}>

            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)