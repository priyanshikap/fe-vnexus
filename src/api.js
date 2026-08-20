const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export function login(email, password, role) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  });
}

export function signup(payload) {
  return request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getProfile(token) {
  return request('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateProfile(token, profile) {
  return request('/users/profile', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(profile),
  });
}

export function getProjects(token, filters = {}) {
  const query = new URLSearchParams(filters).toString();
  return request(`/projects${query ? `?${query}` : ''}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
