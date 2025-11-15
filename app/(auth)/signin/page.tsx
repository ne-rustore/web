'use client';

import { useEffect, useRef } from 'react';

import { signIn } from 'next-auth/react';

const SignIn = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@vkid/sdk@latest/dist-sdk/umd/index.js';
    script.async = true;

    script.onload = () => {
      if (!window.VKIDSDK) {
        console.error('VKIDSDK not available');
        return;
      }

      window.VKIDSDK.Config.init({
        app: Number(process.env.NEXT_PUBLIC_VK_APP_ID),
        redirectUrl: 'https://nerustore.ru/api/auth/callback/vk',
        responseMode: 'popup',
        source: 'widget',
        scope: 'email'
      });

      const oneTap = new window.VKIDSDK.OneTap();
      const container = containerRef.current;

      if (container) {
        oneTap.render({
          container,
          scheme: 'light',
          lang: 'ru'
        });

        oneTap.on('login_success', (e: any) => {
          const { code, device_id } = e.detail;

          signIn('vk', {
            code,
            device_id,
            redirect: true,
            callbackUrl: '/'
          });
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div ref={containerRef} />
    </div>
  );
};

export default SignIn;
