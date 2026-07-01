const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function request(path, options = {}) {
  const res = await fetch(API + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      message = data.error || message;
    } catch (e) {
      message = res.statusText || message;
    }
    throw new Error(message);
  }

  // Some endpoints may return empty body
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export function login(username, password) {
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function getProducts() {
  return request('/api/products');
}

export function getCart() {
  return request('/api/cart');
}

export function addToCart(productId) {
  return request('/api/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  });
}

export function removeFromCart(productId) {
  return request('/api/cart/remove', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  });
}

export function getDbStatus() {
  return request('/api/db/status');
}

export function getNotes() {
  return request('/api/notes');
}

export function createNote(content) {
  return request('/api/notes', { method: 'POST', body: JSON.stringify({ content }) });
}

export function updateNote(id, content) {
  return request(`/api/notes/${id}`, { method: 'PUT', body: JSON.stringify({ content }) });
}

export function deleteNote(id) {
  return request(`/api/notes/${id}`, { method: 'DELETE' });
}
