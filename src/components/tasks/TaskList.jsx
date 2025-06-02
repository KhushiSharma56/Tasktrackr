import { motion } from 'framer-motion';
import TaskCard from '../common/TaskCard';
import React from 'react';

function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  return (
    <div className="space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
          </motion.div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No tasks found.</p>
      )}
    </div>
  );
}

export default TaskList;