# Recipe Explorer Frontend (Ocean Professional)

A modern React UI to browse, search, and view recipe details. Uses an Ocean Professional theme with blue and amber accents, subtle gradients, rounded corners, and smooth interactions.

## Features
- Header with app title and a search bar (searches by title and ingredients)
- Category sidebar with clickable filters
- Responsive grid of recipe cards (image, title, category, time, servings)
- Click a card to open an accessible details modal (ingredients + instructions)
- Mock data by default; can switch to a backend API when available
- Accessible basics: semantic markup, alt text, keyboard navigation, focus-trapped modal, ESC/backdrop close

## Run locally
1. Install dependencies:
   npm install
2. Start the development server (port 3000):
   npm start
3. Open http://localhost:3000

## Theming (Ocean Professional)
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Additional subtle gradient and shadows are used throughout for a polished, modern look.

## Data: Mock vs API
By default, the app reads from local mock data at src/data/recipes.json.

To switch to an API later:
1. Copy .env.example to .env
2. Set REACT_APP_API_BASE_URL to your backend base URL (e.g., https://api.example.com)
3. Restart the dev server:
   npm start

The app will fetch GET {REACT_APP_API_BASE_URL}/recipes and expects an array of recipes:
[
  {
    "id": "1",
    "title": "Name",
    "category": "Dinner",
    "image": "https://...",
    "time": 30,
    "servings": 4,
    "ingredients": ["..."],
    "instructions": ["..."]
  }
]

## Project Structure
- src/App.js — Main layout, state, and routing for modal
- src/styles.css — Global styles and theme tokens
- src/components/
  - Header.jsx — Brand + Search
  - Sidebar.jsx — Category filters
  - RecipeGrid.jsx — Grid container
  - RecipeCard.jsx — Card component
  - RecipeDetail.jsx — Accessible modal
- src/data/recipes.json — Mock data
- src/services/recipeService.js — Fetches mock or API data depending on REACT_APP_API_BASE_URL

## Accessibility
- Semantic elements: header, main, aside, section, article
- Images have descriptive alt text
- Cards are keyboard-activatable (Enter/Space)
- Modal:
  - Uses role="dialog" with aria-modal
  - Closes with ESC
  - Focus is trapped while open and returned to the trigger on close
  - Backdrop click closes modal

## Notes
- No external state library used; React state + memoization
- No extra UI libraries; pure CSS for a lightweight bundle
