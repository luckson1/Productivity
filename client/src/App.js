import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Kanban from './pages/Kanban';
import './app.css'
import { Navbar } from './components/navigation/Navbar';
import { SideBar } from './components/navigation/SideBar';
import { useStateContext } from "../src/context/ContextProvider"
import { FiSettings } from 'react-icons/fi';
import { ThemeSettings } from './utils/ThemeSettings';
import { Onboarding } from './pages/Onboarding';
import ProtectedRoute from './components/users/protectedRoute';
import Dashboard from './pages/Dashboard';
import BugTracker from './pages/BugTracker';
import DnDCalendar from './pages/DnDCalendar';
import Team from './pages/Team';
function App() {
    const { activeMenu, setThemeSettings, currentColor, themeSettings, showNavBar ,currentMode} = useStateContext();
    return (
        <div className={currentMode==="Dark" ? "dark" : ""}>
    
        <BrowserRouter>
            <div className="flex relative dark:bg-[#484B52]">
                <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>

                    <button type="button" className="text-3xl p-3 
                        hover:drop-shadow-xl
                        hover:bg-light-gray 
                        text-white" style={{ background: currentColor, borderRadius: "50%" }}
                        onClick={() => { setThemeSettings(true) }}>
                        <FiSettings />
                    </button>


                </div>
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-[#484B52] bg-white dark:text-white">
                        <SideBar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-[#484B52]">
                        <SideBar />
                    </div>
                )}
                <div className={
                    activeMenu
                        ? 'dark:bg-gray-600 bg-slate-50 min-h-screen md:ml-72 w-full  '
                        : ' bg-slate-50  dark:bg-gray-600  w-full min-h-screen flex-2 '
                }>
                    <div className="fixed md:static  bg-slate-50  dark:bg-gray-600 -navbar w-full ">
                        {showNavBar && <Navbar />}
                    </div>

                    <div>
                        {themeSettings && <ThemeSettings />}
                        <Routes>
                            <Route exact path="/" element={<Home />} />

                            <Route exact path="/tasks" element={
                                <ProtectedRoute>
                                    <Kanban />
                                </ProtectedRoute>} />
                            <Route exact path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>} />
                            <Route exact path="/bug-tracker" element={
                                <ProtectedRoute>
                                    <BugTracker />
                                </ProtectedRoute>} />
                            <Route exact path="/team" element={
                                <ProtectedRoute>
                                    <Team />
                                </ProtectedRoute>
                            } />
                              <Route exact path="/calender" element={
                                <ProtectedRoute>
                                    <DnDCalendar />
                                </ProtectedRoute>
                            } />
                            <Route exact path="/onboarding" element={
                          
                                    <Onboarding />
                             
                            } />

                        </Routes>
                    </div>
                </div>

            </div>
        </BrowserRouter>
        </div>
    );
}

export default App;
