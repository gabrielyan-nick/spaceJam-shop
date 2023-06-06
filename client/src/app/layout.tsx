import '../styles/globals.scss';
import { Providers } from 'store/provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ua">
      <body className='bg-secondaryDark'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
