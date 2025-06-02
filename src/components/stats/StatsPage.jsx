import { motion } from 'framer-motion';
import useTasks from '../../hooks/useTasks';
import useGoals from '../../hooks/useGoals';
import { Bar } from 'react-chartjs-2';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatsPage() {
  const { tasks } = useTasks();
  const { goals } = useGoals();

  const tasksByCategory = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  const taskData = {
    labels: Object.keys(tasksByCategory),
    datasets: [
      {
        label: 'Tasks per Category',
        data: Object.values(tasksByCategory),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const goalProgress = {
    labels: goals.map((goal) => goal.title),
    datasets: [
      {
        label: 'Goal Progress (%)',
        data: goals.map((goal) => goal.progress),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Statistics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Tasks by Category
          </h3>
          <Bar data={taskData} options={{ responsive: true }} />
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Goal Progress
          </h3>
          <Bar data={goalProgress} options={{ responsive: true }} />
        </div>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Task Summary
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Completed: {completedTasks} | Pending: {pendingTasks} | Total: {tasks.length}
        </p>
      </div>
    </motion.div>
  );
}

export default StatsPage;