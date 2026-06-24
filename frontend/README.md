# React Store App (Frontend)

React + Vite frontend for the simple e-commerce app. Talks to the Spring Boot
backend (repository **Java_24J**) over REST.

## Tech Stack

- React 18
- Vite 5
- React Router 6

## Pages & Features

- **Login page** — dummy auth, stores token in localStorage
- **Home page** — product listing with product cards
- **Cart page** — add / remove items, line totals, cart total
- Navbar with live cart badge count and logout button
- Protected routes (redirect to /login when not authenticated)
- Loading spinner, error handling, empty-cart message
- Responsive layout, simple clean CSS

## Folder Structure

```
frontend/
 ├── index.html
 ├── package.json
 ├── vite.config.js
 ├── .env
 ├── .env.example
 ├── .gitignore
 └── src/
      ├── main.jsx
      ├── App.jsx
      ├── api.js              # uses VITE_API_URL
      ├── AuthContext.jsx
      ├── CartContext.jsx
      ├── styles.css
      ├── components/
      │    ├── Navbar.jsx
      │    ├── ProductCard.jsx
      │    └── Spinner.jsx
      └── pages/
           ├── Login.jsx
           ├── Home.jsx
           └── Cart.jsx
```

## Environment Variables

Create `.env` (copy from `.env.example`):

```
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=ReactStoreApp
```

Used in code via:

```
const API = import.meta.env.VITE_API_URL;
```

## Run Instructions

```
npm install
npm run dev
```

Frontend runs on http://localhost:5173

## Demo Login

```
username: admin
password: password
```
