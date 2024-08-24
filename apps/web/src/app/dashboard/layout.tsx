import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import '../globals.css';
import DashboardHeader from './components/DashboardHeader';

const font = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Skillfull Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <DashboardHeader />
        {children}
      </body>
    </html>
  );
}
