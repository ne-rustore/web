'use client';

import dynamic from 'next/dynamic';

const HeroSection = dynamic(
  () => import('@/widgets').then((mod) => mod.HeroSection),
  { ssr: false }
);

const TopicsSection = dynamic(
  () => import('@/widgets').then((mod) => mod.TopicsSection),
  { ssr: false }
);

const TopAppsSection = dynamic(
  () => import('@/widgets').then((mod) => mod.TopAppsSection),
  { ssr: false }
);

const TopNewAppsSection = dynamic(
  () => import('@/widgets').then((mod) => mod.TopNewAppsSection),
  { ssr: false }
);

const EditorChoiceSection = dynamic(
  () => import('@/widgets').then((mod) => mod.EditorChoiceSection),
  { ssr: false }
);

const OnboardingTour = dynamic(
  () =>
    import('@/widgets/Onboarding/OnboardingTour').then(
      (mod) => mod.OnboardingTour
    ),
  { ssr: false }
);

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

        <div data-tour='new-apps'>
          <TopNewAppsSection />
        </div>

        <div data-tour='editor-choice'>
          <EditorChoiceSection />
        </div>
      </main>

      <OnboardingTour />
    </>
  );
};

export default Home;
