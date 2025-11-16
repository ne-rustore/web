'use client';

import { EditorChoiceSection } from '@/widgets/EditorChoice';

const EditorChoicePage = () => {
  return (
    <div className='min-h-screen bg-white dark:bg-slate-900 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-8 text-slate-900 dark:text-white'>
          Выбор редакции
        </h1>
        <EditorChoiceSection />
      </div>
    </div>
  );
};

export default EditorChoicePage;
