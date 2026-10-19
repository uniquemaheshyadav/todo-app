import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="brand-group">
        <div className="logo-badge" aria-hidden="true">
          <CheckCircle2 size={24} strokeWidth={2.4} />
        </div>
        <div className="title-group">
          <h1 className="app-title">Focus</h1>
          <p className="app-subtitle">A little progress every day.</p>
        </div>
      </div>
    </header>
  );
}
