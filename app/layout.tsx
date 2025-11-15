import './styles/globals.css';

import { Footer } from './widgets';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ru'>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
