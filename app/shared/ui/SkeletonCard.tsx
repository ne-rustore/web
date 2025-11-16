'use client';

export function SkeletonCard() {
  return (
    <div className='rounded-xl border bg-white dark:bg-slate-800 p-4 animate-pulse'>
      <div className='flex gap-4'>
        <div className='w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg'></div>
        <div className='flex-1 space-y-2'>
          <div className='h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4'></div>
          <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2'></div>
          <div className='h-8 bg-slate-200 dark:bg-slate-700 rounded w-20'></div>
        </div>
      </div>
    </div>
  );
}
