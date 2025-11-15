import './styles/globals.css';

import type React from 'react';

import Script from 'next/script';

import { ThemeProvider } from '@/features/theme-toggle/lib/ThemeProvider';
import { Providers } from '@/providers';
import { Footer, Header } from './widgets';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang='ru' suppressHydrationWarning>
    <head>
      <Script
        id='microsoft-clarity'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "u6p7w70630");
          `
        }}
      />
    </head>
    <body>
      <Providers>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <div className='container mx-auto px-4 py-6'>{children}</div>
          <Footer />
        </ThemeProvider>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
