import { motion } from 'framer-motion';
import { useState } from 'react';
import useTasks from '../../hooks/useTasks';
import useGoals from "../../hooks/useGoals";
import useCategories from "../../hooks/useCategories";
import SummaryCard from './SummaryCard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import TaskModal from '../common/TaskModal';
import React from 'react';

function Dashboard() {
  const { tasks } = useTasks();
  const { goals } = useGoals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const todayTasks = tasks.filter(
    (task) => new Date(task.dueDate).toDateString() === new Date().toDateString()
  );
  
  const completedTasks = tasks.filter((task) => task.completed).length;
  const goalsInProgress = goals.filter((goal) => goal.progress < 100 && goal.progress > 0).length;

  const calendarEvents = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.dueDate,
    backgroundColor: task.completed ? '#22C55E' : '#3B82F6',
    borderColor: task.completed ? '#22C55E' : '#3B82F6',
  }));

  const handleEventClick = ({ event }) => {
    const task = tasks.find((t) => t.id === event.id);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-800">Welcome to TaskTrackr</h2>
      <p className="text-gray-600 dark:text-gray-400">Let's make today productive!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard title="Tasks Due Today" value={todayTasks.length} icon="List" />
        <SummaryCard title="Goals in Progress" value={goalsInProgress} icon="Target" />
        <SummaryCard title="Tasks Completed" value={completedTasks} icon="CheckCircle" />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-800">Calendar</h3>
        {/* <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventClick={handleEventClick}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek',
            }}
            eventContent={(eventInfo) => (
              <div className="p-1 text-xs">
                {eventInfo.event.title}
              </div>
            )}
          />
        </div> */}
        <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all">
          <style>
            {`
              .fc .fc-toolbar-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: #1f2937; /* gray-800 */
              }
              .dark .fc .fc-toolbar-title {
                color: #f3f4f6; /* gray-100 */
              }

              .fc .fc-button {
                background-color: #3b82f6; /* blue-500 */
                border: none;
                border-radius: 0.5rem;
                padding: 0.25rem 0.75rem;
                font-weight: 500;
                transition: background-color 0.3s;
              }
              .fc .fc-button:hover {
                background-color: #2563eb; /* blue-600 */
              }
              .fc .fc-button:disabled {
                background-color: #cbd5e1; /* gray-300 */
                cursor: not-allowed;
              }

              .fc .fc-daygrid-day-number {
                padding: 4px;
                font-size: 0.85rem;
                font-weight: 500;
                color: #374151;
              }
              .dark .fc .fc-daygrid-day-number {
                color: #e5e7eb; /* gray-200 */
              }

              .fc .fc-daygrid-event {
                padding: 2px 6px;
                border-radius: 6px;
                font-size: 0.75rem;
                font-weight: 500;
              }

              .fc .fc-col-header-cell-cushion {
                color: #1f2937; /* gray-800 */
                font-weight: 600;
              }
              .dark .fc .fc-col-header-cell-cushion {
                color: #f3f4f6; /* gray-100 */
              }

              .fc .fc-daygrid-day {
                transition: background-color 0.2s ease;
                border: 1px solid rgba(0,0,0,0.05);
              }

              .dark .fc .fc-daygrid-day {
                border: 1px solid rgba(255,255,255,0.05);
              }

              .fc .fc-daygrid-day:hover {
                background-color: #f0f9ff;
              }
              .dark .fc .fc-daygrid-day:hover {
                background-color: #1e3a8a22;
              }
            `}
          </style>

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventClick={handleEventClick}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek',
            }}
            eventContent={(eventInfo) => (
              <div className="text-xs font-medium text-white truncate px-1">
                {eventInfo.event.title}
              </div>
            )}
          />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-800">Today's Tasks</h3>
        <div className="mt-4 space-y-4">
          {todayTasks.length > 0 ? (
            todayTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md backdrop-blur-md bg-opacity-80 dark:bg-opacity-80"
              >
                <h4 className="font-medium text-gray-800 dark:text-gray-100">{task.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
                  {task.category}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No tasks due today.</p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-800">Recent Goals</h3>
        <div className="mt-4 space-y-4">
          {goals.slice(0, 3).map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={selectedTask}
        />
      )}
    </motion.div>
  );
}

export default Dashboard;
