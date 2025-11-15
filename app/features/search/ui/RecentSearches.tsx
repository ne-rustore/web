import type { SearchItem } from '../types';

import { Clock } from 'lucide-react';

import { Button } from '@/shared/ui';

interface RecentSearchesProps {
  items: SearchItem[];
  onSelect: (_item: SearchItem) => void;
  onClear: () => void;
}

export const RecentSearches = ({
  items,
  onSelect,
  onClear
}: RecentSearchesProps) => {
  if (items.length === 0) return null;

  return (
    <div>
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center gap-2 text-sm font-medium text-slate-900'>
          <Clock className='h-4 w-4' />
          Недавние поиски
        </div>
        <Button variant='ghost' size='sm' onClick={onClear} className='text-xs'>
          Очистить
        </Button>
      </div>
      <div className='space-y-1'>
        {items.map((item) => (
          <Button
            key={item.id}
            variant='ghost'
            className='w-full justify-start text-sm h-auto py-2 hover:bg-slate-50'
            onClick={() => onSelect(item)}
          >
            <span className='text-slate-900'>{item.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
