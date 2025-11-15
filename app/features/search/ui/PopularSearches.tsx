import type { SearchItem } from '../types';

import { TrendingUp } from 'lucide-react';

import { Button } from '@/shared/ui';

interface PopularSearchesProps {
  items: SearchItem[];
  onSelect: (_item: SearchItem) => void;
}

export const PopularSearches = ({ items, onSelect }: PopularSearchesProps) => (
  <div>
    <div className='flex items-center gap-2 mb-3 text-sm font-medium text-slate-900'>
      <TrendingUp className='h-4 w-4' />
      Часто ищут
    </div>
    <div className='space-y-1'>
      {items.map((item) => (
        <Button
          key={item.id}
          variant='ghost'
          className='w-full justify-start text-sm h-auto py-2 hover:bg-slate-50'
          onClick={() => onSelect(item)}
        >
          <div className='text-left'>
            <div className='text-slate-900'>{item.title}</div>
            <div className='text-xs text-slate-500 capitalize'>
              {item.type === 'app' ? 'Приложение' : 'Игра'}
            </div>
          </div>
        </Button>
      ))}
    </div>
  </div>
);
