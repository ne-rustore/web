import { HeroSection, TopAppsSection, TopicsSection } from '@/widgets';

export default function Home() {
  return (
    <main className='min-h-screen bg-white dark:bg-slate-900'>
      <HeroSection />
      <TopicsSection />
      <TopAppsSection />
    </main>
  );
}
