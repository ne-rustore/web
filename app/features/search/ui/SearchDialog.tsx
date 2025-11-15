'use client';

import { Dialog, DialogContent } from '@/shared/ui';
import { POPULAR_SEARCHES } from '../lib/constants';
import { useSearch } from '../lib/useSearch';
import { SearchItem } from '../types';
import { PopularSearches } from './PopularSearches';
import { RecentSearches } from './RecentSearches';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const { query, setQuery, results, loading, recent, saveRecent, clearRecent } =
    useSearch();

  const handleSelect = (item: SearchItem) => {
    saveRecent(item);
    onOpenChange(false);
    setQuery('');
    console.log('Search:', item.title);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) setQuery('');
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-2xl bg-white p-4 gap-0'>
        <div className='border-b border-slate-200 pb-4'>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder='Поиск приложений и игр...'
          />
        </div>

        <div className='max-h-96 overflow-y-auto'>
          {query ? (
            <div className='pt-4'>
              <SearchResults
                items={results}
                loading={loading}
                onSelect={handleSelect}
              />
            </div>
          ) : (
            <div className='space-y-6 pt-4'>
              <RecentSearches
                items={recent}
                onSelect={handleSelect}
                onClear={clearRecent}
              />
              <PopularSearches
                items={POPULAR_SEARCHES.slice(0, 6)}
                onSelect={handleSelect}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
