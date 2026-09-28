const API_URL = 'http://localhost:5000';

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export function fetchArticles() {
  return fetch(`${API_URL}/api/articles`, {
    credentials: 'include',
  }).then(handleResponse);
}

export function createArticle(formData) {
  return fetch(`${API_URL}/api/articles`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  }).then(handleResponse);
}

export function updateArticle(id, formData) {
  return fetch(`${API_URL}/api/articles/${id}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  }).then(handleResponse);
}

export function deleteArticle(id) {
  return fetch(`${API_URL}/api/articles/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    }).then(handleResponse);
}

export function fetchAdminArticles() {
  return fetch(`${API_URL}/api/articles`).then(handleResponse);
}

export function fetchArticle(id) {
  return fetch(`${API_URL}/api/articles/${id}`).then(handleResponse);
}

export function fetchWriters() {
  return fetch(`${API_URL}/api/users`, {
    credentials: 'include',
  }).then(handleResponse);
}

export function createWriter(email, password) {
  return fetch(`${API_URL}/api/users`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type':'application/json' },
    body: JSON.stringify({ email, password })
  }).then(handleResponse);
}

export function deleteWriter(id) {
  return fetch(`${API_URL}/api/users/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then(handleResponse);
}