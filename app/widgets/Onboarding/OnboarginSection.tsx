'use client';

export const OnboardingSection = () => {
  return (
    <section className='py-12 px-4' data-tour='hero'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-4'>
          RuStore — российский магазин приложений
        </h1>
        <div data-tour='search' className='max-w-md mx-auto'>
          <input
            type='text'
            placeholder='Поиск приложений...'
            className='w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
          />
        </div>
      </div>
    </section>
  );
};
