import { motion } from 'framer-motion';
import { useState } from 'react';
import GoalProgress from './GoalProgress';
import Modal from '../common/Modal';
import useGoals from '../../hooks/useGoals';
import React from 'react';

function GoalsPage() {
  const { goals, addGoal, editGoal, deleteGoal } = useGoals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleAddGoal = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleSaveGoal = (goalData) => {
    if (editingGoal) {
      editGoal(editingGoal.id, goalData);
    } else {
      addGoal(goalData);
    }
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Goals</h2>
        <button
          onClick={handleAddGoal}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Add Goal
        </button>
      </div>
      <div className="space-y-4">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GoalProgress goal={goal} onEdit={handleEditGoal} onDelete={deleteGoal} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No goals found.</p>
        )}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveGoal}
          initialData={editingGoal}
          type="goal"
        />
      )}
    </motion.div>
  );
}

export default GoalsPage;