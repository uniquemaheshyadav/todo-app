# Focus — Personal Task Manager

> *A little progress every day.*

Focus is a modern, minimal, production-quality personal task management web application built with React, Vite, and plain CSS.



## ✨ Features

- **Core Task Management**:
  - Add tasks with the <kbd>Enter</kbd> key or Add button.
  - Automatic whitespace trimming and empty task prevention.
  - Checkbox toggle for active/completed states with subtle strikethrough styling.
  - Instant task deletion with automatic state synchronization.
- **Due Dates & Overdue Status**:
  - Optional due date picker on creation and inline editing.
  - Overdue warning badges (`Overdue · Date`), `Due today` alerts, and upcoming badges.
  - Sensible sorting: overdue tasks first, then upcoming dated tasks, undated tasks, and completed tasks at the bottom.
- **Priority System**:
  - Low, Medium, High priority levels with subtle color-coded indicators.
  - Direct click-to-cycle priority adjustment.
- **Inline Editing**:
  - Double-click or click the edit icon to edit tasks inline.
  - Save with <kbd>Enter</kbd>, cancel with <kbd>Escape</kbd>.
- **Filters & Summary**:
  - Filter tabs: **All**, **Active**, and **Completed** with live count badges.
  - Progress bar and stats summary (Total, Active, Completed).
  - Clear completed tasks action.
- **Persistent Storage**:
  - Automatic synchronization with browser `localStorage`.
  - Graceful fallback for missing or corrupted stored data.
- **Responsive & Accessible**:
  - Optimized for both desktop and narrow mobile screens.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/uniquemaheshyadav/todo-app.git

# Navigate to project directory
cd todo-app

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS (Custom Design System tokens, CSS variables)
- **Icons**: Lucide React
- **Persistence**: Browser `localStorage`
