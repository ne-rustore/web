import type { TopicId } from '@/widgets/Topics';

import { notFound } from 'next/navigation';

import { HeroSection, TopAppsSection, TopicsSection } from '@/widgets';
import { topics } from '@/widgets/Topics';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return topics.map((t) => ({ category: t.id }));
}

const isTopicId = (value: string): value is TopicId => {
  return topics.some((t) => t.id === value);
};

const CategoryPage = async ({ params }: PageProps) => {
  const { category } = await params;

  if (!isTopicId(category)) notFound();

  const currentTopic = topics.find((t) => t.id === category)!;

  return (
    <main className='min-h-screen bg-white dark:bg-slate-900'>
      <HeroSection />
      <TopicsSection currentCategory={category} />
      <TopAppsSection
        category={category}
        title={`Приложения: ${currentTopic.label}`}
      />
    </main>
  );
};

export default CategoryPage;
