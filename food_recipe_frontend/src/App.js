import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RecipeGrid from './components/RecipeGrid';
import RecipeDetail from './components/RecipeDetail';
import { fetchRecipes } from './services/recipeService';

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the main Recipe Explorer application.
   * It renders the header, category sidebar, recipe grid, and a details modal.
   * Data is loaded from a mock source by default, and can be switched to an API using REACT_APP_API_BASE_URL.
   */
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load recipes from service (mock by default)
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchRecipes()
      .then((data) => {
        if (!mounted) return;
        setRecipes(data);
        setError('');
      })
      .catch((e) => {
        console.error(e);
        if (!mounted) return;
        setError('Failed to load recipes.');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(recipes.map(r => r.category));
    return ['All', ...Array.from(set)];
  }, [recipes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter(r => {
      const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        (r.ingredients || []).some(i => i.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [recipes, query, activeCategory]);

  return (
    <div className="app-root" style={{ backgroundColor: 'var(--bg)' }}>
      <Header query={query} onQueryChange={setQuery} />
      <main className="layout" role="main" aria-label="Recipe Explorer">
        <Sidebar
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <section className="content-area">
          {loading && <div className="notice">Loading recipes…</div>}
          {error && <div className="notice error" role="alert">{error}</div>}
          {!loading && !error && (
            <RecipeGrid
              recipes={filtered}
              onOpen={(r) => setSelected(r)}
            />
          )}
        </section>
      </main>

      <RecipeDetail
        recipe={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

export default App;
