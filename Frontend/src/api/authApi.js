const API_URL = 'http://localhost:5000';

export async function login(email, password) {
    const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || 'Login failed');
    }
}

export async function logout() {
    await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
    });
}

export async function verifyToken() {
  const res = await fetch(`${API_URL}/api/verify`, {
    credentials: 'include', 
 });
  
  if (!res.ok) return { valid: false };

  const data = await res.json();
  return { valid: data.valid, role: data.role };
}
