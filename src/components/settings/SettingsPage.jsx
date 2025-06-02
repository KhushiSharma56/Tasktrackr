import { motion } from 'framer-motion';
import useTasks from '../../hooks/useTasks';
import useGoals from '../../hooks/useGoals';
import useDarkMode from '../../hooks/useDarkMode';
import { Trash, Download } from 'lucide-react';
import Papa from 'papaparse';
import { formatDate } from '../../utils/helpers';
import React from 'react';

function SettingsPage() {
  const { tasks, setTasks } = useTasks();
  const { goals, setGoals } = useGoals();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all tasks and goals?')) {
      setTasks([]);
      setGoals([]);
    }
  };

  const exportTasksToCSV = () => {
    const csvData = tasks.map((task) => ({
      Title: task.title,
      Description: task.description,
      Category: task.category,
      DueDate: formatDate(task.dueDate),
      Completed: task.completed ? 'Yes' : 'No',
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tasks_export.csv';
    link.click();
  };

  const exportGoalsToCSV = () => {
    const csvData = goals.map((goal) => ({
      Title: goal.title,
      Description: goal.description,
      Category: goal.category,
      TargetDate: formatDate(goal.dueDate),
      Progress: `${goal.progress}%`,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'goals_export.csv';
    link.click();
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Settings</h2>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-800 dark:text-gray-100">Dark Mode</span>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-800 dark:text-gray-100">Export Tasks</span>
          <button
            onClick={exportTasksToCSV}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center"
          >
            <Download className="w-5 h-5 mr-2" /> Export Tasks
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-800 dark:text-gray-100">Export Goals</span>
          <button
            onClick={exportGoalsToCSV}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center"
          >
            <Download className="w-5 h-5 mr-2" /> Export Goals
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-800 dark:text-gray-100">Clear All Data</span>
          <button
            onClick={clearData}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center"
          >
            <Trash className="w-5 h-5 mr-2" /> Clear
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SettingsPage;