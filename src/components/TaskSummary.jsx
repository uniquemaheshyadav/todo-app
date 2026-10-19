import React from 'react';

export default function TaskSummary({ total, active, completed }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="summary-section" aria-label="Task Summary">
      <div className="summary-cards">
        <div className="summary-stat">
          <span className="stat-label">Total</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">Active</span>
          <span className="stat-value active-count">{active}</span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">Completed</span>
          <span className="stat-value completed-count">{completed}</span>
        </div>
      </div>

      {total > 0 && (
        <div className="progress-container" aria-label={`${percent}% completed`}>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="progress-text">{percent}% done</span>
        </div>
      )}
    </section>
  );
}
