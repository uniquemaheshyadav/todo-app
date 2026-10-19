import React from 'react';
import { CheckCircle2, ListTodo, Sparkles } from 'lucide-react';

export default function EmptyState({ filter, totalTasks, activeTasks }) {
  if (totalTasks === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon-wrap neutral">
          <ListTodo size={32} strokeWidth={1.8} />
        </div>
        <h3 className="empty-title">No tasks yet</h3>
        <p className="empty-desc">
          Add your first task above to get started and build your momentum.
        </p>
      </div>
    );
  }

  if (filter === 'active' && activeTasks === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon-wrap success">
          <Sparkles size={32} strokeWidth={1.8} />
        </div>
        <h3 className="empty-title">All tasks completed!</h3>
        <p className="empty-desc">
          Outstanding work. You're completely caught up for now.
        </p>
      </div>
    );
  }

  if (filter === 'completed') {
    return (
      <div className="empty-state">
        <div className="empty-icon-wrap neutral">
          <CheckCircle2 size={32} strokeWidth={1.8} />
        </div>
        <h3 className="empty-title">No completed tasks yet</h3>
        <p className="empty-desc">
          Tasks you check off will appear here. Keep going!
        </p>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div className="empty-icon-wrap neutral">
        <ListTodo size={32} strokeWidth={1.8} />
      </div>
      <h3 className="empty-title">No tasks match this filter</h3>
      <p className="empty-desc">
        Try switching back to "All" to view all your tasks.
      </p>
    </div>
  );
}
