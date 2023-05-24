import '../styles/globals.scss';
import { Providers } from 'store/provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ua">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
