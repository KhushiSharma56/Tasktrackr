import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import TaskPage from './components/tasks/TaskPage';
import GoalsPage from './components/goals/GoalsPage';
import CategoriesPage from './components/categories/CategoriesPage';
import StatsPage from './components/stats/StatsPage';
import SettingsPage from './components/settings/SettingsPage';
import useDarkMode from './hooks/useDarkMode';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <BrowserRouter basename='/Tasktrackr'>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} toggleDarkMode={toggleDarkMode} />
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <motion.main
            className="flex-1 p-4 sm:p-6 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </motion.main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
