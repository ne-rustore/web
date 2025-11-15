import { Search } from 'lucide-react';

import { Input } from '@/shared/ui';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
}: SearchInputProps) => (
  <div className='relative py-4'>
    <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className='pl-10 h-12 text-base'
      autoFocus
    />
  </div>
);
