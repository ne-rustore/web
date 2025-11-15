import { Search } from 'lucide-react';

import { Input } from '@/shared/ui';

interface SearchTriggerProps {
  onClick: () => void;
}

export const SearchTrigger = ({ onClick }: SearchTriggerProps) => {
  return (
    <div className='relative group'>
      <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors' />
      <Input
        placeholder='Поиск приложений и игр...'
        className='pl-10 bg-slate-100 border-slate-200 focus-visible:border-blue-600 focus-visible:ring-blue-500/20 transition-all cursor-pointer w-full'
        onClick={onClick}
        readOnly
      />
    </div>
  );
};
