# React_24J — E-commerce Frontend (React + Vite)

This repository contains the **frontend** of a simple full-stack e-commerce app.
The **backend** (Spring Boot) lives in a separate repository: **Java_24J**.

## Project Overview

A simple e-commerce demo with a login page, a product catalog, and cart
functionality. The frontend is built with React + Vite and communicates with the
Spring Boot backend over a REST API. No database is used (in-memory storage on
the backend).

## Features

- Login page with dummy auth; token stored in localStorage
- Home page showing products as cards
- Cart page: add / remove items, line totals and cart total
- Navbar with live cart badge count and logout button
- Protected routes (redirect to /login when not authenticated)
- Loading spinner, error handling, empty-cart message
- Responsive, clean CSS

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
      ├── api.js
      ├── AuthContext.jsx
      ├── CartContext.jsx
      ├── styles.css
      ├── components/  (Navbar, ProductCard, Spinner)
      └── pages/       (Login, Home, Cart)
```

## Environment Variables

Create `frontend/.env` (copy from `frontend/.env.example`):

```
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=ReactStoreApp
```

## Run Instructions

```
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

## Backend

Make sure the backend (repository **Java_24J**) is running on
http://localhost:8080:

```
cd backend
mvn clean install
mvn spring-boot:run
```

## Demo Login

```
username: admin
password: password
```
