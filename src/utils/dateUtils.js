/**
 * Date utility functions for the Focus task manager.
 */

// Formats a Date object or YYYY-MM-DD into a localized YYYY-MM-DD string
export function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTomorrowString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Format YYYY-MM-DD for readable display (e.g., "Oct 24" or "Oct 24, 2026")
export function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const currentYear = new Date().getFullYear();
    
    const options = {
      month: 'short',
      day: 'numeric',
      ...(year !== currentYear ? { year: 'numeric' } : {})
    };
    return date.toLocaleDateString(undefined, options);
  } catch {
    return dateStr;
  }
}

// Get the visual status of a task's due date
export function getDueDateStatus(dueDate, completed) {
  if (!dueDate) {
    return null;
  }

  // Completed tasks should never show misleading overdue styling
  if (completed) {
    return {
      status: 'completed',
      label: formatDisplayDate(dueDate),
      isOverdue: false,
    };
  }

  const todayStr = getTodayString();
  const tomorrowStr = getTomorrowString();

  if (dueDate < todayStr) {
    return {
      status: 'overdue',
      label: `Overdue · ${formatDisplayDate(dueDate)}`,
      isOverdue: true,
    };
  }

  if (dueDate === todayStr) {
    return {
      status: 'today',
      label: 'Due today',
      isOverdue: false,
    };
  }

  if (dueDate === tomorrowStr) {
    return {
      status: 'tomorrow',
      label: 'Due tomorrow',
      isOverdue: false,
    };
  }

  return {
    status: 'upcoming',
    label: `Due ${formatDisplayDate(dueDate)}`,
    isOverdue: false,
  };
}

// Sort tasks: overdue first -> upcoming dated tasks -> undated tasks -> completed tasks
export function sortTasks(tasks) {
  const todayStr = getTodayString();
  const priorityRank = { high: 3, medium: 2, low: 1 };

  return [...tasks].sort((a, b) => {
    // 1. Completed tasks always go to the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Both are active
    if (!a.completed) {
      const aHasDue = Boolean(a.dueDate);
      const bHasDue = Boolean(b.dueDate);
      const aIsOverdue = aHasDue && a.dueDate < todayStr;
      const bIsOverdue = bHasDue && b.dueDate < todayStr;

      // Overdue tasks take top priority
      if (aIsOverdue && !bIsOverdue) return -1;
      if (!aIsOverdue && bIsOverdue) return 1;

      // Both are dated (both overdue or both future)
      if (aHasDue && bHasDue) {
        const dateDiff = a.dueDate.localeCompare(b.dueDate);
        if (dateDiff !== 0) return dateDiff;
        // Tie breaker by priority
        return (priorityRank[b.priority] || 2) - (priorityRank[a.priority] || 2);
      }

      // Dated tasks come before undated tasks
      if (aHasDue && !bHasDue) return -1;
      if (!aHasDue && bHasDue) return 1;

      // Both undated: sort by priority, then creation date (newest first)
      const prioDiff = (priorityRank[b.priority] || 2) - (priorityRank[a.priority] || 2);
      if (prioDiff !== 0) return prioDiff;

      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    // Both are completed: newest completed / created first
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}
