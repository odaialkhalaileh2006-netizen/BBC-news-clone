const API_URL = 'http://localhost:5000/api/readers';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(body.error || 'Something went wrong');
    error.status = response.status;
    throw error;
  }
  return body;
}

export function registerReader(name, email, password) {
  return request('/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export function loginReader(email, password) {
  return request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function fetchReader() {
  try {
    return await request('/me');
  } catch (err) {
    if (err.status === 401) return null;
    throw err;
  }
}

export function logoutReader() {
  return request('/logout', { method: 'POST' });
}