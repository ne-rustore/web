import type { SearchItem } from '../types';

export const DEBOUNCE_DELAY = 300;

export const searchApps = async (query: string): Promise<SearchItem[]> => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `/api/apps/search?q=${encodeURIComponent(query)}&limit=10`
    );
    if (!response.ok) {
      console.error('Search API error:', response.status);
      return [];
    }

    const data = await response.json();

    return (
      data.items?.map((app: any) => ({
        id: app.id,
        title: app.name,
        type: app.category.toLowerCase().includes('game') ? 'game' : 'app',
        category: app.category
      })) || []
    );
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};
