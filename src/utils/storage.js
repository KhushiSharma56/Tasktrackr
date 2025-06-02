export const getTasks = () => {
  const data = localStorage.getItem('tasks');
  try {
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to parse tasks from localStorage", error);
    return [];
  }
};


export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const getGoals = () => {
  const goals = localStorage.getItem('goals');
  return goals ? JSON.parse(goals) : [];
};

export const saveGoals = (goals) => {
  localStorage.setItem('goals', JSON.stringify(goals));
};
export const getCategories = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setCategories = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};