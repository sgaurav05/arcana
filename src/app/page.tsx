import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="mb-8">
        <Logo className="w-24 h-24" />
      </div>
      <h1 className="text-5xl md:text-6xl font-headline font-bold text-accent mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        Welcome to Arcana Daily
      </h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-500 delay-200">
        Your personal guide to the mystical world of tarot. Discover daily insights, explore card meanings, and find clarity on your path.
      </p>
      <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-400">
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/daily-draw">
            Draw Card of the Day
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/library">
            Explore the Library
          </Link>
        </Button>
      </div>
    </div>
  );
}