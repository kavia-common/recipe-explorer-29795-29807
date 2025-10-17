import React, { useEffect, useRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * Modal showing recipe details: image, ingredients, instructions.
 * Props:
 * - recipe: recipe object or null
 * - onClose: function() to close modal
 */
export default function RecipeDetail({ recipe, onClose }) {
  const dialogRef = useRef(null);
  const lastActiveRef = useRef(null);

  // Focus trap and ESC handling
  useEffect(() => {
    if (!recipe) return;
    lastActiveRef.current = document.activeElement;
    const el = dialogRef.current;
    if (el) {
      const focusable = el.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const handleKey = (e) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onClose();
        }
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener('keydown', handleKey);
      first?.focus();
      return () => {
        document.removeEventListener('keydown', handleKey);
        lastActiveRef.current && lastActiveRef.current.focus?.();
      };
    }
  }, [recipe, onClose]);

  if (!recipe) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${recipe.title} details`}
      onMouseDown={(e) => {
        // Close when clicking outside the dialog
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" ref={dialogRef}>
        <div className="modal-header">
          <div className="modal-title">{recipe.title}</div>
          <button
            className="modal-close"
            aria-label="Close details"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-grid">
            <img
              className="modal-media"
              src={recipe.image}
              alt={`${recipe.title} full image`}
            />
            <div>
              <div className="card-meta" style={{ marginBottom: 8 }}>
                <span className="badge">{recipe.category}</span>
                {recipe.time ? <span>⏱ {recipe.time} min</span> : null}
                {recipe.servings ? <span>👥 {recipe.servings}</span> : null}
              </div>
              <h3 className="section-title">Ingredients</h3>
              <ul className="list">
                {(recipe.ingredients || []).map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="section-title">Instructions</h3>
            <div className="instructions">
              {Array.isArray(recipe.instructions)
                ? recipe.instructions.map((step, i) => (
                    <p key={i}>{i + 1}. {step}</p>
                  ))
                : <p>{recipe.instructions}</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
