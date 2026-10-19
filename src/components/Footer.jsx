import React from 'react';

export default function Footer({ activeCount, totalCount }) {
  return (
    <footer className="app-footer">
      <div className="footer-status">
        {totalCount === 0 ? (
          <span>Ready for your day</span>
        ) : activeCount === 0 ? (
          <span className="all-done-note">🎉 All tasks completed!</span>
        ) : (
          <span>
            <strong>{activeCount}</strong> {activeCount === 1 ? 'task' : 'tasks'} remaining
          </span>
        )}
      </div>
      <div className="footer-hints">
        <span>Press <kbd>↵</kbd> to add</span>
        <span className="dot-sep">•</span>
        <span>Click priority to cycle</span>
      </div>
    </footer>
  );
}
