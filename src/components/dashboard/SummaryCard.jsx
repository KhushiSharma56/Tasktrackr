import { motion } from 'framer-motion';
import { List, Target, CheckCircle } from 'lucide-react';
import React from 'react';

function SummaryCard({ title, value, icon }) {
  const icons = {
    List: <List className="w-8 h-8 text-blue-500" />,
    Target: <Target className="w-8 h-8 text-green-500" />,
    CheckCircle: <CheckCircle className="w-8 h-8 text-purple-500" />,
  };

  return (
    <motion.div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 flex items-center space-x-4 transition-all duration-200 hover:scale-[1.02]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icons[icon]}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{value}</p>
      </div>
    </motion.div>
  );
}

export default SummaryCard;