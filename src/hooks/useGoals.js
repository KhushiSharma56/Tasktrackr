import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getGoals, saveGoals } from '../utils/storage';

function useGoals() {
  const [goals, setGoals] = useState(getGoals());

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  const addGoal = (goalData) => {
    setGoals([...goals, { id: uuidv4(), ...goalData, progress: goalData.progress || 0 }]);
  };

  const editGoal = (id, goalData) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, ...goalData } : goal)));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return { goals, addGoal, editGoal, deleteGoal };
}

export default useGoals;