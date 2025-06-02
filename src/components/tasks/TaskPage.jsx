import { motion } from 'framer-motion';
import { useState } from 'react';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import Modal from '../common/Modal';
import useTasks from '../../hooks/useTasks';
import React from 'react';

function TaskPage() {
  const { tasks, addTask, editTask, deleteTask, toggleTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ category: 'All', status: 'All', search: '' });

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      editTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = filters.category === 'All' || task.category === filters.category;
    const matchesStatus =
      filters.status === 'All' ||
      (filters.status === 'Completed' ? task.completed : !task.completed);
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Tasks</h2>
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Add Task
        </button>
      </div>
      <TaskFilter filters={filters} setFilters={setFilters} />
      <TaskList
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          initialData={editingTask}
          type="task"
        />
      )}
    </motion.div>
  );
}

export default TaskPage;