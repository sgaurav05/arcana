'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Card of the Day', href: '/daily-draw' },
  { name: 'Three-Card Spread', href: '/spreads/three-card' },
  { name: 'Love Spread', href: '/spreads/love-spread' },
  { name: 'Card Library', href: '/library' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold sm:inline-block font-headline">
              {APP_NAME}
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-accent',
                  pathname === item.href ? 'text-accent' : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
