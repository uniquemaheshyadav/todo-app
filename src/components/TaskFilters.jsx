import React from 'react';

export default function TaskFilters({
  currentFilter,
  onFilterChange,
  counts,
  onClearCompleted
}) {
  const filters = [
    { id: 'all', label: 'All', count: counts.total },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="filters-bar">
      <div className="filter-buttons" role="tablist" aria-label="Task status filters">
        {filters.map((f) => {
          const isActive = currentFilter === f.id;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={isActive}
              className={`filter-btn ${isActive ? 'active' : ''}`}
              onClick={() => onFilterChange(f.id)}
            >
              <span>{f.label}</span>
              <span className="filter-badge">{f.count}</span>
            </button>
          );
        })}
      </div>

      {counts.completed > 0 && onClearCompleted && (
        <button
          type="button"
          className="clear-completed-btn"
          onClick={onClearCompleted}
          title="Remove all completed tasks"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
