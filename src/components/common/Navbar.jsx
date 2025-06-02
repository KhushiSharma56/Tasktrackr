import { motion } from 'framer-motion';
import { Menu, Moon, Sun } from 'lucide-react';
import React from 'react';

function Navbar({ toggleSidebar, toggleDarkMode }) {
  return (
    <motion.nav
      className="bg-white dark:bg-gray-800 shadow-lg p-4 flex justify-between items-center backdrop-blur-md bg-opacity-80 dark:bg-opacity-80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">TaskTrackr</h1>
      </div>
      <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
        <div className="dark:hidden">
          <Moon className="w-5 h-5 text-gray-600" />
        </div>
        <div className="hidden dark:block">
          <Sun className="w-5 h-5 text-gray-300" />
        </div>
      </button>
    </motion.nav>
  );
}

export default Navbar;