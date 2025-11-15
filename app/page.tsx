'use client';

import { HeroSection, TopAppsSection, TopicsSection } from '@/widgets';
import { OnboardingTour } from '@/widgets/Onboarding/OnboardingTour';

const Home = () => {
  return (
    <>
      <main className='min-h-screen bg-white dark:bg-slate-900'>
        <div data-tour='hero'>
          <HeroSection />
        </div>
        <div data-tour='topics'>
          <TopicsSection />
        </div>
        <div data-tour='top-apps'>
          <TopAppsSection />
        </div>
      </main>
      <OnboardingTour />
    </>
  );
};

export default Home;
