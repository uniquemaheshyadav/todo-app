import React, { useState, useRef } from 'react';
import { Plus, Calendar, Flag } from 'lucide-react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      inputRef.current?.focus();
      return;
    }

    onAddTask({
      title: trimmedTitle,
      dueDate: dueDate || null,
      priority,
    });

    // Reset input fields
    setTitle('');
    setDueDate('');
    setPriority('medium');
    setShowOptions(false);
    
    // Auto-focus back to input for rapid task entry
    inputRef.current?.focus();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-input-row">
        <input
          ref={inputRef}
          type="text"
          className="task-input"
          placeholder="What needs to get done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          aria-label="New task title"
        />

        <button
          type="button"
          className={`toggle-options-btn ${showOptions || dueDate || priority !== 'medium' ? 'active' : ''}`}
          onClick={() => setShowOptions(!showOptions)}
          title="Toggle due date and priority settings"
          aria-label="Toggle due date and priority options"
        >
          <Calendar size={18} />
        </button>

        <button
          type="submit"
          className="add-task-btn"
          disabled={!title.trim()}
          aria-label="Add task"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Add</span>
        </button>
      </div>

      {/* Quick options drawer for optional Due Date and Priority */}
      {showOptions && (
        <div className="task-options-row">
          <div className="option-field">
            <label htmlFor="new-task-duedate" className="option-label">
              <Calendar size={14} />
              <span>Due Date</span>
            </label>
            <input
              id="new-task-duedate"
              type="date"
              className="option-date-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            {dueDate && (
              <button
                type="button"
                className="clear-option-btn"
                onClick={() => setDueDate('')}
                title="Clear date"
              >
                Clear
              </button>
            )}
          </div>

          <div className="option-field">
            <label htmlFor="new-task-priority" className="option-label">
              <Flag size={14} />
              <span>Priority</span>
            </label>
            <select
              id="new-task-priority"
              className="option-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      )}
    </form>
  );
}
