import type { App } from '@/widgets/TopApps/model/topApps';

import Image from 'next/image';
import Link from 'next/link';

import { Star } from 'lucide-react';

export const AppCard = ({
  id,
  title,
  description,
  rating,
  badge,
  image
}: App) => {
  return (
    <Link
      href={`/app/${id}`}
      className='group flex gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors'
    >
      <div className='shrink-0'>
        <div className='w-14 h-14 rounded-xl shadow-sm overflow-hidden bg-white p-1'>
          <Image
            src={image}
            alt={title}
            width={56}
            height={56}
            className='w-full h-full object-contain'
            unoptimized={image.endsWith('.svg')}
          />
        </div>
      </div>

      <div className='flex-1 min-w-0'>
        <h3 className='font-medium text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
          <span className='whitespace-nowrap'>{title}</span>
        </h3>

        <p className='text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5'>
          {description}
        </p>

        <div className='flex items-center gap-2 mt-1.5 text-xs'>
          <div className='flex items-center gap-0.5'>
            <Star className='h-3.5 w-3.5 fill-yellow-400 text-yellow-400' />
            <span className='font-medium text-slate-700 dark:text-slate-300'>
              {rating}
            </span>
          </div>

          {badge && (
            <>
              <span className='text-slate-400 dark:text-slate-500'>•</span>
              <span className='text-emerald-600 dark:text-emerald-400 font-medium'>
                {badge}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
