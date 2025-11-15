import './styles/globals.css';

import type React from 'react';

import { ThemeProvider } from '@/features/theme-toggle/lib/ThemeProvider';
import Providers from '@/providers/SessionProvider';
import { Footer, Header } from './widgets';

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ru' suppressHydrationWarning>
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
};

export default RootLayout;
