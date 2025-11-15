'use client';

import { useEffect, useRef } from 'react';

import { signIn } from 'next-auth/react';

const VKOneTapButton = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.getElementById('vkid-sdk')) return;

    const script = document.createElement('script');
    script.id = 'vkid-sdk';
    script.src = 'https://unpkg.com/@vkid/sdk@2/dist-sdk/umd/index.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!window.VKIDSDK || !containerRef.current) {
        console.error('VKID SDK not loaded');
        return;
      }

      const { VKIDSDK } = window;

      VKIDSDK.Config.init({
        app: Number(process.env.NEXT_PUBLIC_VK_APP_ID),
        redirectUrl: 'https://01fb35aa2d748d.lhr.life/api/auth/callback/vk',
        responseMode: VKIDSDK.ConfigResponseMode.Callback,
        source: VKIDSDK.ConfigSource.LOWCODE,
        scope: 'email'
      });

      const oneTap = new VKIDSDK.OneTap();

      oneTap
        .render({
          container: containerRef.current,
          showAlternativeLogin: true,
          oauthList: ['ok_ru', 'mail_ru']
        })
        .on(VKIDSDK.WidgetEvents.ERROR, (error: string) => {
          console.error('VKID Error:', error);
        })
        .on(
          VKIDSDK.OneTapInternalEvents.LOGIN_SUCCESS,
          async (payload: any) => {
            const { code, device_id } = payload;

            await signIn('vk', {
              code,
              device_id,
              redirect: true,
              callbackUrl: '/profile'
            });
          }
        );
    };
  }, []);

  return <div ref={containerRef} />;
};

export default VKOneTapButton;
