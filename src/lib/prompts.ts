// lib/api/prompts.ts
export async function getAllPrompts() {
  const res = await fetch('http://localhost:5000/all-promts'); // ← match the typo
  if (!res.ok) throw new Error('Failed to fetch prompts');
  return res.json();
}