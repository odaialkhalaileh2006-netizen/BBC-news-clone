const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchContent() {
  const res = await fetch(`${API_URL}/api/content`);
  if (!res.ok) {
    throw new Error(`Failed to load content (${res.status})`);
  }
  return res.json();
}
