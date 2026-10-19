import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskSummary from './components/TaskSummary';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskItem from './components/TaskItem';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import { sortTasks, getTodayString } from './utils/dateUtils';
import './App.css';

const STORAGE_KEY = 'focus_tasks_v1';

const DEFAULT_TASKS = [
  {
    id: 'task-1',
    title: 'Review quarterly goals & roadmap',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    dueDate: getTodayString(),
    priority: 'high',
  },
  {
    id: 'task-2',
    title: 'Complete DSA assignment',
    completed: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    dueDate: null,
    priority: 'medium',
  },
  {
    id: 'task-3',
    title: 'Set up Focus task manager',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    dueDate: null,
    priority: 'low',
  },
];

// Helper to safely load tasks from localStorage
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to parse tasks from localStorage:', err);
  }
  // If first time visiting (no key saved), provide starter tasks
  return DEFAULT_TASKS;
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState('all');

  // Save tasks to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err);
    }
  }, [tasks]);

  // Generate stable ID
  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  };

  // Add new task
  const handleAddTask = ({ title, dueDate, priority }) => {
    const newTask = {
      id: generateId(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || null,
      priority: priority || 'medium',
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Toggle completion
  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Update task (for editing title, date, or priority)
  const handleUpdateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  // Clear all completed tasks
  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  // Calculate counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Sort tasks: overdue first, upcoming dated, undated, completed at the end
  const sortedTasks = sortTasks(filteredTasks);

  return (
    <div className="app-container">
      <main className="main-card">
        {/* Header with Focus branding */}
        <Header />

        {/* Compact summary with active/completed counts & progress bar */}
        <TaskSummary
          total={totalTasks}
          active={activeTasks}
          completed={completedTasks}
        />

        {/* Task input with Add button & options */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Filter tabs: All, Active, Completed */}
        <TaskFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={{ total: totalTasks, active: activeTasks, completed: completedTasks }}
          onClearCompleted={handleClearCompleted}
        />

        {/* Task list or helpful empty states */}
        <section className="task-list-section" aria-label="Task List">
          {sortedTasks.length === 0 ? (
            <EmptyState
              filter={filter}
              totalTasks={totalTasks}
              activeTasks={activeTasks}
            />
          ) : (
            <ul className="task-list">
              {sortedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                />
              ))}
            </ul>
          )}
        </section>

        {/* Footer with remaining task count and helpful tips */}
        <Footer activeCount={activeTasks} totalCount={totalTasks} />
      </main>
    </div>
  );
}
