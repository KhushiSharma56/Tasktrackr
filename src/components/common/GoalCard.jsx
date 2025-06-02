import { motion } from 'framer-motion';

function GoalCard({ goal }) {
  return (
    <motion.div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 transition-all duration-200 hover:scale-[1.02]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h4 className="font-medium text-gray-800 dark:text-gray-100">{goal.title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">{goal.description}</p>
      <div className="mt-2">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <motion.div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${goal.progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${goal.progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{goal.progress}% Complete</p>
      </div>
      <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
        {goal.category}
      </span>
    </motion.div>
  );
}

export default GoalCard;