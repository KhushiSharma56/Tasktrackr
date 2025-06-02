import { motion } from 'framer-motion';
import { Edit, Trash } from 'lucide-react';
import React from 'react';

function GoalProgress({ goal, onEdit, onDelete }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 transition-all duration-200 hover:scale-[1.02]">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-800 dark:text-gray-100">{goal.title}</h4>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(goal)} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
            <Edit className="w-5 h-5" />
          </button>
          <button onClick={() => onDelete(goal.id)} className="text-gray-600 dark:text-gray-300 hover:text-red-500">
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{goal.description}</p>
      <div className="mt-2">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <motion.div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${goal.progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${goal.progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{goal.progress}% Complete</p>
      </div>
      <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
        {goal.category}
      </span>
    </div>
  );
}

export default GoalProgress;