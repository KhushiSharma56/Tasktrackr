import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getTasks, saveTasks } from '../utils/storage';
import useCategories from './useCategories';
import { getCategories, setCategories } from '../utils/storage';

function useTasks() {
  const [tasks, setTasks] = useState(getCategories('tasks') || []);
  const [filter, setFilter] = useState({ category: 'All', status: 'All', dueDate: 'All' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const { categories } = useCategories();
  const categoryList = Object.keys(categories);

  useEffect(() => {
    setCategories('tasks', tasks);
  }, [tasks]);

  useEffect(() => {
    let filtered = [...tasks];

    // Filter by category
    if (filter.category !== 'All') {
      filtered = filtered.filter((task) => task.category === filter.category);
    }

    // Filter by status
    if (filter.status !== 'All') {
      filtered = filtered.filter((task) =>
        filter.status === 'Completed' ? task.completed : !task.completed
      );
    }

    // Filter by due date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (filter.dueDate !== 'All') {
      filtered = filtered.filter((task) => {
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        if (filter.dueDate === 'Today') {
          return dueDate.getTime() === today.getTime();
        } else if (filter.dueDate === 'Upcoming') {
          return dueDate > today;
        } else if (filter.dueDate === 'Past Due') {
          return dueDate < today && !task.completed;
        }
        return true;
      });
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, filter, searchQuery]);

  const addTask = (task) => {
    const category = categoryList.includes(task.category) ? task.category : 'General';
    setTasks([...tasks, { ...task, id: task.id || uuidv4(), completed: false, category }]);
  };

  const editTask = (id, updatedTask) => {
    const category = categoryList.includes(updatedTask.category) ? updatedTask.category : 'General';
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask, category } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return {
    tasks,
    filteredTasks,
    setTasks,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
    setFilter,
    setSearchQuery,
  };
}

export default useTasks;