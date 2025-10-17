import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar with category filters.
 * Props:
 * - categories: string[]
 * - active: string
 * - onSelect: function(category)
 */
export default function Sidebar({ categories, active, onSelect }) {
  return (
    <aside className="sidebar" aria-label="Recipe categories">
      <h2>Categories</h2>
      <div className="category-list">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${active === cat ? 'active' : ''}`}
            onClick={() => onSelect(cat)}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>
    </aside>
  );
}
