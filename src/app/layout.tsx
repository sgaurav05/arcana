import type {Metadata} from 'next';
import './globals.css';
import { APP_NAME } from '@/lib/constants';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'A mystical digital tarot app for daily readings and insights.',
};

const Meteors = () => {
  const meteorCount = 20;
  return (
    <>
      {Array.from({ length: meteorCount }).map((_, i) => (
        <div
          key={i}
          className="meteor"
          style={{
            top: `${Math.random() * 20}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </>
  );
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Meteors />
        <Header />
        <main className="container mx-auto px-4 py-8 relative z-10">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
