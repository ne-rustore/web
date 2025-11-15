import { User } from 'lucide-react';

import { Button } from '@/shared/ui';

export const ProfileButton = () => (
  <Button
    variant='ghost'
    size='icon'
    className='text-slate-600 hover:text-blue-600 group'
  >
    <User className='h-5 w-5 group-hover:scale-110 transition-transform' />
  </Button>
);
