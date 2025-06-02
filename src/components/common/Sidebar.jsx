import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Home, List, Target, Tag, BarChart, Settings } from 'lucide-react';
import React from 'react';

function Sidebar({ isOpen, toggleSidebar }) {
  const links = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/tasks', icon: List, label: 'Tasks' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/categories', icon: Tag, label: 'Categories' },
    { path: '/stats', icon: BarChart, label: 'Stats' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 sm:static sm:w-20 sm:hover:w-64 transition-all duration-300 ease-in-out backdrop-blur-md bg-opacity-80 dark:bg-opacity-80`}
      initial={false}
      animate={{ x: isOpen ? 0 : -256 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-4 sm:hidden">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Menu</h2>
        <button onClick={toggleSidebar}>
          <span className="text-gray-600 dark:text-gray-300">Close</span>
        </button>
      </div>
      <nav className="mt-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `group flex items-center p-4 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 ${
                isActive ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`
            }
            onClick={() => window.innerWidth < 640 && toggleSidebar()}
          >
            <link.icon className="w-6 h-6 mr-4 sm:mr-0 sm:group-hover:mr-4 transition-all" />
            <span className="sm:hidden sm:group-hover:inline">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
}

export default Sidebar;
