'use client';

import { useState } from 'react';
import Link from 'next/link';

import { AnimatedStar } from '@/shared/ui';

interface AppCardProps {
  id: string;
  title: string;
  description: string;
  rating: number;
  image: string;
  badge?: string;
  categories: string[];
}

export function AppCard({
  id,
  title,
  description,
  rating,
  image,
  badge
}: AppCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/application/${id}`} className='block'>
      <div className='rounded-xl border bg-white dark:bg-slate-800 p-4 hover:shadow-md transition-shadow cursor-pointer group'>
        <div className='flex gap-4'>
          <div className='shrink-0'>
            {!imageError ? (
              <img
                src={image}
                alt={title}
                className='w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform'
                onError={() => setImageError(true)}
              />
            ) : (
              <div className='w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform'>
                <span className='text-xs text-slate-500'>No Image</span>
              </div>
            )}
          </div>

          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between mb-1'>
              <h3 className='font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                {title}
              </h3>
              {badge && (
                <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2'>
                  {badge}
                </span>
              )}
            </div>

            <div className='flex items-center mb-2'>
              <div className='flex'>
                {[...Array(5)].map((_, index) => (
                  <AnimatedStar
                    key={index}
                    filled={index < Math.floor(rating)}
                    size={16}
                  />
                ))}
              </div>
              <span className='text-sm text-slate-500 ml-2'>
                {rating.toFixed(1)}
              </span>
            </div>

            <p className='text-sm text-slate-600 dark:text-slate-300 line-clamp-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
