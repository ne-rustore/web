import { Button } from '@/shared/ui';
import { SearchItem } from '../types';

interface SearchResultsProps {
  items: SearchItem[];
  loading: boolean;
  onSelect: (item: SearchItem) => void;
}

export const SearchResults = ({
  items,
  loading,
  onSelect,
}: SearchResultsProps) => {
  if (loading) {
    return <div className='text-center text-slate-500 py-8'>Поиск...</div>;
  }

  if (items.length === 0) {
    return (
      <div className='text-center text-slate-500 py-8'>Ничего не найдено</div>
    );
  }

  return (
    <div className='space-y-2'>
      {items.map((item) => (
        <Button
          key={item.id}
          variant='ghost'
          className='w-full justify-start h-auto p-3 hover:bg-slate-50'
          onClick={() => onSelect(item)}
        >
          <div className='text-left'>
            <div className='font-medium text-slate-900'>{item.title}</div>
            <div className='text-sm text-slate-500 capitalize'>
              {item.type === 'app' ? 'Приложение' : 'Игра'} • {item.category}
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};
