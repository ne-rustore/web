import { Bell } from 'lucide-react';

import { Button } from '@/shared/ui';

export const NotificationBell = () => (
  <Button
    variant='ghost'
    size='icon'
    className='text-slate-600 hover:text-blue-600 relative group'
  >
    <Bell className='h-5 w-5 group-hover:scale-110 transition-transform' />
    <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white'>
      2
    </span>
  </Button>
);
