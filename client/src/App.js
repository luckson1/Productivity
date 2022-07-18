import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExpenseTracker from './pages/ExpenseTracker';
import Home from './pages/Home';
import Kanban from './pages/Kanban';
import ShoppingList from './pages/ShoppingList';
import './app.css'
import { Navbar } from './components/navigation/Navbar';
import { SideBar } from './components/navigation/SideBar';
import { useStateContext } from "../src/context/ContextProvider"
import { FiSettings } from 'react-icons/fi';
function App() {
  const {activeMenu,setThemeSettings,currentColor}= useStateContext();
  return (
    <BrowserRouter>
    <div className="flex relative dark:bg-main-dark-bg">
                    <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
                   
                            <button type="button" className="text-3xl p-3 
                        hover:drop-shadow-xl
                        hover:bg-light-gray 
                        text-white" style={{ background: currentColor, borderRadius: "50%" }}
                        onClick={()=>{setThemeSettings(true)}}>
                                <FiSettings />
                            </button>
                    

                    </div>
                    {activeMenu ? (
                        <div className="w-72 fixed  dark:bg-secondary-dark-bg bg-white">
                            <SideBar />
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-dark-bg bg-white">
                           <SideBar />
                        </div>)}
                    <div className={` dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full ${activeMenu 
                       
                       ? " md:ml-72 " : " flex-2"}`}>
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg-navbar w-full ">
                            <Navbar />
                        </div>
                    
                    <div>
    <Routes>
    <Route exact path="/" element={<Home />} />
      <Route exact path="/kanban" element={<Kanban />} />     
      <Route exact path="/shopping-list" element={<ShoppingList />} />  
      <Route exact path="/expense-tracker" element={<ExpenseTracker />} />  

    </Routes>
    </div>
                    </div>
                   
                </div>
  </BrowserRouter>
  );
}

export default App;
