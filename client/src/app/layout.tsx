import '../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SpaceJam shop',
  description: '',
};

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
        {children}
      </body>
    </html>
  );
}
