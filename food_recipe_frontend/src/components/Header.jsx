import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header component with brand and search bar.
 * Props:
 * - query: string
 * - onQueryChange: function(newQuery)
 */
export default function Header({ query, onQueryChange }) {
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <a href="/" className="brand" aria-label="Recipe Explorer Home">
          <div className="brand-badge" aria-hidden="true"><span>R</span></div>
          <div className="brand-title">Recipe Explorer</div>
        </a>
        <div className="search-wrap" role="search">
          <span className="search-icon" aria-hidden="true">🔎</span>
          <input
            className="search-input"
            type="search"
            placeholder="Search recipes by title or ingredient…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search recipes"
          />
        </div>
      </div>
    </header>
  );
}
