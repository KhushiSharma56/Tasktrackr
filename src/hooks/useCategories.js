import { useState, useEffect } from 'react';
import { getCategories, setCategories } from '../utils/storage';

function useCategories() {
  const [categories, setCategories] = useState(() => getCategories('categories') || { General: '#3B82F6' });

  useEffect(() => {
    setCategories('categories', categories);
  }, [categories]);

  const addCategory = (name, color) => {
    setCategories((prev) => ({
      ...prev,
      [name]: color,
    }));
  };

  const deleteCategory = (name) => {
    setCategories((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  return { categories, addCategory, deleteCategory };
}

export default useCategories;
