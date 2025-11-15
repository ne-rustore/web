import type { SearchItem } from '../types';

export const DEBOUNCE_DELAY = 300;

export const POPULAR_SEARCHES: SearchItem[] = [
  { id: 1, title: 'ВКонтакте', type: 'app', category: 'Социальные сети' },
  { id: 2, title: 'Telegram', type: 'app', category: 'Мессенджеры' },
  { id: 3, title: 'СберБанк', type: 'app', category: 'Финансы' },
  { id: 4, title: 'Яндекс', type: 'app', category: 'Поиск' },
  { id: 5, title: 'TikTok', type: 'app', category: 'Социальные сети' },
  { id: 6, title: 'Standoff 2', type: 'game', category: 'Экшен' },
  { id: 7, title: 'WhatsApp', type: 'app', category: 'Мессенджеры' },
  { id: 8, title: 'YouTube', type: 'app', category: 'Видео' }
];

export const mockSearch = (query: string): Promise<SearchItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = POPULAR_SEARCHES.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, DEBOUNCE_DELAY);
  });
};
