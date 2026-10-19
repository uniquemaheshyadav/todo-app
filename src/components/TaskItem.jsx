import React, { useState, useRef, useEffect } from 'react';
import { 
  Check, 
  Trash2, 
  Edit3, 
  Calendar, 
  AlertCircle, 
  X, 
  Clock 
} from 'lucide-react';
import { getDueDateStatus } from '../utils/dateUtils';

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');
  const [titleError, setTitleError] = useState(false);

  const editInputRef = useRef(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditDueDate(task.dueDate || '');
    setEditPriority(task.priority || 'medium');
    setTitleError(false);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTitleError(false);
    setEditTitle(task.title);
    setEditDueDate(task.dueDate || '');
    setEditPriority(task.priority || 'medium');
  };

  const handleSaveEdit = () => {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) {
      setTitleError(true);
      editInputRef.current?.focus();
      return;
    }

    onUpdate(task.id, {
      title: trimmedTitle,
      dueDate: editDueDate || null,
      priority: editPriority,
    });

    setIsEditing(false);
    setTitleError(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  // Allow fast priority cycling on badge click
  const handleCyclePriority = () => {
    if (task.completed) return;
    const order = ['low', 'medium', 'high'];
    const nextIndex = (order.indexOf(task.priority || 'medium') + 1) % order.length;
    onUpdate(task.id, { priority: order[nextIndex] });
  };

  const dueStatus = getDueDateStatus(task.dueDate, task.completed);

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      {/* Checkbox toggle */}
      <button
        type="button"
        role="checkbox"
        aria-checked={task.completed}
        className={`task-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? `Mark "${task.title}" as active` : `Mark "${task.title}" as completed`}
      >
        {task.completed && <Check size={14} strokeWidth={3} />}
      </button>

      {/* Main content area */}
      <div className="task-content">
        {isEditing ? (
          <div className="inline-edit-form">
            <input
              ref={editInputRef}
              type="text"
              className={`inline-edit-input ${titleError ? 'has-error' : ''}`}
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
                if (titleError && e.target.value.trim()) setTitleError(false);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Task title cannot be empty"
              aria-label="Edit task title"
            />
            {titleError && <p className="edit-error-msg">Task title cannot be empty</p>}

            <div className="inline-edit-meta">
              <div className="meta-field">
                <Calendar size={13} />
                <input
                  type="date"
                  className="meta-date-input"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  aria-label="Edit due date"
                />
              </div>

              <div className="meta-field">
                <select
                  className="meta-priority-select"
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  aria-label="Edit priority"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div className="inline-edit-actions">
                <button
                  type="button"
                  className="save-edit-btn"
                  onClick={handleSaveEdit}
                  title="Save changes (Enter)"
                >
                  <Check size={15} /> Save
                </button>
                <button
                  type="button"
                  className="cancel-edit-btn"
                  onClick={handleCancelEdit}
                  title="Cancel changes (Escape)"
                >
                  <X size={15} /> Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="task-details">
            <div className="task-title-row">
              <span 
                className="task-title"
                onDoubleClick={handleStartEdit}
                title="Double-click to edit"
              >
                {task.title}
              </span>
            </div>

            <div className="task-meta-row">
              {/* Due Date Indicator */}
              {dueStatus && (
                <span className={`due-badge ${dueStatus.status}`}>
                  {dueStatus.isOverdue && <AlertCircle size={12} strokeWidth={2.4} />}
                  {dueStatus.status === 'today' && <Clock size={12} strokeWidth={2.4} />}
                  {!dueStatus.isOverdue && dueStatus.status !== 'today' && <Calendar size={12} strokeWidth={2} />}
                  <span>{dueStatus.label}</span>
                </span>
              )}

              {/* Priority indicator with direct click toggle */}
              <button
                type="button"
                className={`priority-badge prio-${task.priority || 'medium'}`}
                onClick={handleCyclePriority}
                disabled={task.completed}
                title={`Priority: ${task.priority || 'medium'}. Click to cycle.`}
                aria-label={`Change priority from ${task.priority || 'medium'}`}
              >
                <span className="priority-dot" />
                <span className="priority-text">
                  {(task.priority || 'medium').charAt(0).toUpperCase() + (task.priority || 'medium').slice(1)}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {!isEditing && (
        <div className="task-actions">
          <button
            type="button"
            className="action-btn edit-btn"
            onClick={handleStartEdit}
            title="Edit task"
            aria-label={`Edit task "${task.title}"`}
          >
            <Edit3 size={15} />
          </button>
          <button
            type="button"
            className="action-btn delete-btn"
            onClick={() => onDelete(task.id)}
            title="Delete task"
            aria-label={`Delete task "${task.title}"`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </li>
  );
}
