import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import React from 'react';

function TaskModal({ isOpen, onClose, task }) {
  if (!task) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 w-full max-w-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{task.title}</h3>
              <button onClick={onClose} className="text-gray-600 dark:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Category:</span> {task.category}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Due Date:</span> {formatDate(task.dueDate)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Status:</span> {task.completed ? 'Completed' : 'Pending'}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskModal;