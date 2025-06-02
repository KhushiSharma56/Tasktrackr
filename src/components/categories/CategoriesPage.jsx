import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trash, Plus } from 'lucide-react';
import useTasks from '../../hooks/useTasks';
import React from 'react';
import { getCategories, setCategories } from '../../utils/storage';

function CategoriesPage() {
  const { tasks = [], editTask } = useTasks();

  const storedCategories = getCategories('categories') || {};
  const [categories, setCategoryState] = useState(storedCategories);
  const [newCategory, setNewCategory] = useState('');
  const [color, setColor] = useState('#3B82F6');

  const addCategory = () => {
    if (newCategory && !categories[newCategory]) {
      const updated = { ...categories, [newCategory]: color };
      setCategoryState(updated);
      setCategories('categories', updated);
      setNewCategory('');
    }
  };

  const deleteCategory = (category) => {
    const updated = { ...categories };
    delete updated[category];
    setCategoryState(updated);
    setCategories('categories', updated);

    // Reassign tasks from deleted category to 'General'
    tasks
      .filter((task) => task.category === category)
      .forEach((task) => editTask(task.id, { ...task, category: 'General' }));
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Categories</h2>

      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="p-1 border border-gray-300 dark:border-gray-600 rounded-lg"
        />
        <button
          onClick={addCategory}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" /> Add
        </button>
      </div>

      <div className="space-y-4">
        {Object.keys(categories).length > 0 ? (
          Object.entries(categories).map(([category, color]) => (
            <motion.div
              key={category}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 flex justify-between items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-gray-800 dark:text-gray-100">{category}</span>
              </div>
              <button
                onClick={() => deleteCategory(category)}
                className="text-gray-600 dark:text-gray-300 hover:text-red-500"
              >
                <Trash className="w-5 h-5" />
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No categories found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default CategoriesPage;
