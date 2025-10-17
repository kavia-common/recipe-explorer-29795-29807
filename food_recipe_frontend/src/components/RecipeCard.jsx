import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Card representing a recipe item.
 * Props:
 * - recipe: { id, title, category, image, time, servings }
 * - onOpen: function() to open detail
 */
export default function RecipeCard({ recipe, onOpen }) {
  return (
    <article className="card" role="listitem" tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      aria-label={`Open ${recipe.title} details`}
    >
      <img
        className="card-media"
        src={recipe.image}
        alt={`${recipe.title} image`}
        loading="lazy"
      />
      <div className="card-body">
        <div className="card-title">{recipe.title}</div>
        <div className="card-meta">
          <span className="badge">{recipe.category}</span>
          {recipe.time ? <span>⏱ {recipe.time} min</span> : null}
          {recipe.servings ? <span>👥 {recipe.servings}</span> : null}
        </div>
      </div>
    </article>
  );
}
