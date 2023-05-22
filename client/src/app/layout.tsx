import '../styles/globals.css';
import { Providers } from 'store/provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ua">
      <body
        className="h-screen bg-gradient-to-tr from-[#09013D] via-[#890372] to-[#75F0E8]
"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
