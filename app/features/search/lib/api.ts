import type { SearchItem } from '../types';

const API_URL = 'http://localhost:8080';

export async function searchApps(query: string): Promise<SearchItem[]> {
  if (!query.trim()) return [];

  const url = `${API_URL}/apps/search?q=${encodeURIComponent(query)}&limit=10`;
  const res = await fetch(url, { method: 'GET' });

  if (!res.ok) throw new Error('Search request failed');

  const data = await res.json();

  return (data.items ?? []).map((app: any) => ({
    id: app.id,
    title: app.name,
    type: app.category?.toLowerCase().includes('game') ? 'game' : 'app',
    category: app.category
  }));
}
