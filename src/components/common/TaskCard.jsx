import { motion } from 'framer-motion';
import { Edit, Trash, CheckCircle } from 'lucide-react';
import React from 'react';

function TaskCard({ task, onEdit, onDelete, onToggle }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 transition-all duration-200 hover:scale-[1.02]">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="w-5 h-5 text-blue-500"
          />
          <h4
            className={`font-medium ${
              task.completed
                ? 'text-gray-500 dark:text-gray-400 line-through'
                : 'text-gray-800 dark:text-gray-100'
            }`}
          >
            {task.title}
          </h4>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(task)} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
            <Edit className="w-5 h-5" />
          </button>
          <button onClick={() => onDelete(task.id)} className="text-gray-600 dark:text-gray-300 hover:text-red-500">
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
          {task.category}
        </span>
        <span className="text-xs text-gray-600 dark:text-gray-400">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;