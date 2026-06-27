/**
 * Base URL for the Express backend API.
 * Set NEXT_PUBLIC_API_URL in Vercel to your deployed backend URL.
 * Falls back to localhost:5000 for local development.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Fetch wrapper that returns null on failure instead of throwing.
 */
export async function fetchPrompts() {
  try {
    const res = await fetch(`${API_BASE_URL}/all-promts`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`Failed to fetch prompts: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.prompts || data || [];
  } catch (err) {
    console.error('Failed to fetch prompts:', err.message);
    return [];
  }
}
