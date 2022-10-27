import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Kanban from "./pages/Kanban";
import "./app.css";
import { Navbar } from "./components/navigation/Navbar";
import { SideBar } from "./components/navigation/SideBar";
import { useStateContext } from "./context/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { ThemeSettings } from "./utils/ThemeSettings";
import { Onboarding } from "./pages/Onboarding";
import ProtectedRoute from "./components/users/protectedRoute";
import Dashboard from "./pages/Dashboard";
import BugTracker from "./pages/BugTracker";
import DnDCalendar from "./pages/DnDCalendar";
import Team from "./pages/Team";
import CompletedItems from "./pages/CompletedItems";
function App() {
  const {
    activeMenu,
    currentColor,
    showNavBar,
    currentMode,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-[#484B52]">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <button
              type="button"
              className="text-3xl p-3 
                        hover:drop-shadow-xl
                        hover:bg-light-gray 
                        text-white"
              style={{ background: currentColor, borderRadius: "50%" }}
              onClick={() => {
                setThemeSettings(true);
              }}
            >
              <FiSettings />
            </button>
          </div>
          {activeMenu ? (
            <div className="w-60 fixed sidebar dark:bg-[#484B52] bg-white dark:text-white z-10">
              <SideBar />
            </div>
          ) : (
            <div className="w-0 dark:bg-[#484B52] z-10">
              <SideBar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-gray-600 bg-slate-50 min-h-screen md:ml-60 w-full  "
                : " bg-slate-50  dark:bg-gray-600  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static  bg-slate-50  dark:bg-gray-600 -navbar w-full ">
              {showNavBar && <Navbar />}
            </div>

            <div>
              {themeSettings && <ThemeSettings/>}
              <Routes>
                <Route  path="/" element={<Home />} />

                <Route
                 
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <Kanban />
                    </ProtectedRoute>
                  }
                />
                <Route
                 
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                 
                  path="/bug-tracker"
                  element={
                    <ProtectedRoute>
                      <BugTracker />
                    </ProtectedRoute>
                  }
                />
                <Route
                 
                  path="/team"
                  element={
                    <ProtectedRoute>
                      <Team />
                    </ProtectedRoute>
                  }
                />
                <Route
                 
                  path="/calender"
                  element={
                    <ProtectedRoute>
                      <DnDCalendar />
                    </ProtectedRoute>
                  }
                />
                <Route
                 
                  path="/completed"
                  element={
                    <ProtectedRoute>
                      <CompletedItems />
                    </ProtectedRoute>
                  }
                />
                <Route path="/onboarding" element={<Onboarding />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
