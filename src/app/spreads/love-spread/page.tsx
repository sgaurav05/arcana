'use client';

import { useState, useEffect } from 'react';
import { tarotDeck, TarotCardData } from '@/lib/tarot-data';
import { Button } from '@/components/ui/button';
import { TarotCard } from '@/components/TarotCard';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { LoveLogo } from '@/components/LoveLogo';

type DrawnCard = {
  card: TarotCardData;
  isReversed: boolean;
};

const spreadPositions = ['You', 'Your Partner', 'The Relationship'];

export default function LoveSpreadPage() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedState = sessionStorage.getItem('loveSpreadState');
    if (storedState) {
        try {
            const parsedState = JSON.parse(storedState);
             if (Array.isArray(parsedState) && parsedState.length === 3) {
                setDrawnCards(parsedState);
                setIsFlipped(true);
                return;
            }
        } catch (e) {
            console.error("Failed to parse stored love spread state", e);
            sessionStorage.removeItem('loveSpreadState');
        }
    }
  }, []);

  const drawSpread = () => {
    setIsFlipped(false);
    setTimeout(() => {
        const newDrawnCards: DrawnCard[] = [];
        const usedIndices = new Set<number>();

        while (newDrawnCards.length < 3) {
            const randomIndex = Math.floor(Math.random() * tarotDeck.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                const isReversed = Math.random() > 0.5;
                newDrawnCards.push({ card: tarotDeck[randomIndex], isReversed });
            }
        }
        setDrawnCards(newDrawnCards);
        sessionStorage.setItem('loveSpreadState', JSON.stringify(newDrawnCards));
        setIsFlipped(true);
    }, 150);
  };

  useEffect(() => {
    // This effect runs once on component mount on the client side.
    if (isClient && !sessionStorage.getItem('loveSpreadState')) {
      drawSpread();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  return (
    <div className="flex flex-col items-center text-center py-10">
      <LoveLogo className="mb-4" />
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Love Spread</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        Gain insight into your romantic life. This spread explores the energies of you, your partner, and the relationship itself.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 mb-8 w-full max-w-4xl">
        {spreadPositions.map((position, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 className="text-2xl font-headline text-accent mb-4">{position}</h2>
            <div className="w-60 h-[350px]">
              {isClient && drawnCards[index] ? (
                <TarotCard
                  card={drawnCards[index].card}
                  isReversed={drawnCards[index].isReversed}
                  isFlipped={isFlipped}
                />
              ) : (
                <div className="w-full h-full border-2 border-dashed border-accent/30 rounded-xl" />
              )}
            </div>
            {drawnCards[index] && isFlipped && (
              <div className="mt-4 text-center animate-in fade-in duration-500">
                <h3 className="text-xl font-bold font-headline">{drawnCards[index].card.name}</h3>
                {drawnCards[index].isReversed && <p className="text-accent text-sm">(Reversed)</p>}
                 <Button asChild variant="link" className="text-accent">
                    <Link href={`/library/${encodeURIComponent(drawnCards[index].card.name)}`}>
                        View Meaning
                    </Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button onClick={drawSpread} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
        <Heart className="mr-2" />
        {drawnCards.length > 0 ? 'Draw a New Love Spread' : 'Draw Your Love Cards'}
      </Button>
    </div>
  );
}
