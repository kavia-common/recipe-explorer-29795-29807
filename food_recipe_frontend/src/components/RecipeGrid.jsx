import React from 'react';
import RecipeCard from './RecipeCard';

/**
 * PUBLIC_INTERFACE
 * Grid of recipe cards.
 * Props:
 * - recipes: array of recipe objects
 * - onOpen: function(recipe) called when a card is clicked
 */
export default function RecipeGrid({ recipes, onOpen }) {
  if (!recipes || recipes.length === 0) {
    return <div className="notice">No recipes found. Try another search or category.</div>;
  }
  return (
    <div className="grid" role="list" aria-label="Recipes">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onOpen={() => onOpen(r)} />
      ))}
    </div>
  );
}
