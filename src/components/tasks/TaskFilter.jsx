import { useEffect, useState } from 'react';
import useTasks from '../../hooks/useTasks';
import React from 'react';
import useCategories from '../../hooks/useCategories';
// function TaskFilter({ filters, setFilters }) {
//   const { tasks } = useTasks();
//   const categories = ['All', ...new Set(tasks.map((task) => task.category))];

//   return (
//     <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
//       <select
//         value={filters.category}
//         onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//         className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100"
//       >
//         {categories.map((category) => (
//           <option key={category} value={category}>
//             {category}
//           </option>
//         ))}
//       </select>
//       <select
//         value={filters.status}
//         onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//         className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100"
//       >
//         <option value="All">All</option>
//         <option value="Completed">Completed</option>
//         <option value="Pending">Pending</option>
//       </select>
//       <input
//         type="text"
//         placeholder="Search tasks..."
//         value={filters.search}
//         onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//         className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100"
//       />
//     </div>
//   );
// }

// export default TaskFilter;
function TaskFilter() {
  const { tasks, setFilter, setSearchQuery } = useTasks();
  const { categories } = useCategories();
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [dueDate, setDueDate] = useState('All');
  const [search, setSearch] = useState('');

  const categoryList = ['All', ...Object.keys(categories)];

  useEffect(() => {
    setFilter({ category, status, dueDate });
  }, [category, status, dueDate, setFilter]);

  useEffect(() => {
    setSearchQuery(search);
  }, [search, setSearchQuery]);

  return (
    <div className="glass p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100"
          >
            {categoryList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Due Date
          </label>
          <select
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100"
          >
            <option value="All">All</option>
            <option value="Today">Today</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Past Due">Past Due</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskFilter;