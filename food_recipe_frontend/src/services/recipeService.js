const API_BASE = process.env.REACT_APP_API_BASE_URL;

/**
 * PUBLIC_INTERFACE
 * Fetch recipes from API if REACT_APP_API_BASE_URL is set; otherwise, use local mock data.
 * Returns Promise<Recipe[]>
 */
export async function fetchRecipes() {
  // Prefer API if configured
  if (API_BASE && API_BASE.trim() !== '') {
    const base = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
    const res = await fetch(`${base}/recipes`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    return normalize(data);
  }

  // Fallback to local mock data
  const data = await import('../data/recipes.json');
  return normalize(data.default || data);
}

function normalize(items) {
  return (items || []).map((r, idx) => ({
    id: r.id || String(idx + 1),
    title: r.title || 'Untitled Recipe',
    category: r.category || 'Misc',
    image: r.image || 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop',
    time: r.time ?? null,
    servings: r.servings ?? null,
    ingredients: r.ingredients || [],
    instructions: r.instructions || []
  }));
}
