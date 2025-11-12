// Use the API base URL from environment variables
const BASE = process.env.REACT_APP_API_URL || 'https://deployment-and-devops-essentials-z176.onrender.com/api';

// Generic function to handle responses
async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} ${errorText}`);
  }
  return response.json();
}

// Fetch all bugs
export async function fetchBugs() {
  const response = await fetch(`${BASE}/bugs`);
  return handleResponse(response);
}

// Create a new bug
export async function createBug(bug) {
  const response = await fetch(`${BASE}/bugs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bug),
  });
  return handleResponse(response);
}

// Update an existing bug
export async function updateBug(id, changes) {
  const response = await fetch(`${BASE}/bugs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });
  return handleResponse(response);
}

// Delete a bug
export async function deleteBug(id) {
  const response = await fetch(`${BASE}/bugs/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`Failed to delete bug with ID ${id}`);
  }
}
