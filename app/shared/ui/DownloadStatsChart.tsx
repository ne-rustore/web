'use client';

import { useEffect, useRef } from 'react';

interface DownloadStatsChartProps {
  data: Array<{
    id: number;
    name: string;
    value: number;
  }>;
  title?: string;
  maxValue?: number;
}

export const DownloadStatsChart = ({
  data,
  title = 'Статистика загрузок',
  maxValue
}: DownloadStatsChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate max value if not provided
  const calculatedMax =
    maxValue || Math.max(...data.map((item) => item.value), 1);

  // Animation effect
  useEffect(() => {
    const bars = containerRef.current?.querySelectorAll('.chart-bar');
    if (bars) {
      bars.forEach((bar, index) => {
        setTimeout(() => {
          (bar as HTMLElement).style.height = '100%';
        }, 100 * index);
      });
    }
  }, [data]);

  return (
    <div className='bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm'>
      <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>
        {title}
      </h3>

      <div className='space-y-4'>
        {data.length > 0 ? (
          <div className='flex items-end gap-2 h-40' ref={containerRef}>
            {data.map((item, index) => {
              const percentage = (item.value / calculatedMax) * 100;
              return (
                <div
                  key={item.id}
                  className='flex flex-col items-center flex-1 min-w-0'
                >
                  <div className='text-xs text-slate-500 dark:text-slate-400 mb-1 truncate w-full text-center'>
                    {item.name}
                  </div>
                  <div
                    className='bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm w-8/12 transition-all duration-500 ease-out chart-bar'
                    style={{
                      height: '0%',
                      minHeight: percentage === 0 ? '10px' : '2px',
                      maxHeight: '100%',
                      transitionDelay: `${index * 100}ms`
                    }}
                  />
                  <div className='text-xs mt-1 text-slate-700 dark:text-slate-300'>
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='flex items-center justify-center h-40 text-slate-500 dark:text-slate-400'>
            Нет данных для отображения
          </div>
        )}
      </div>
    </div>
  );
};
