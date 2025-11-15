import './styles/reset.css';
import './styles/globals.css';

import type React from 'react';

import { ThemeProvider } from '@/features/theme-toggle/lib/ThemeProvider';
import { Footer, Header } from './widgets';

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ru' suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
