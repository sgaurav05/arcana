'use client';

import { useState, useEffect } from 'react';
import { tarotDeck, TarotCardData } from '@/lib/tarot-data';
import { Button } from '@/components/ui/button';
import { TarotCard } from '@/components/TarotCard';
import Link from 'next/link';

type DrawnCard = {
  card: TarotCardData;
  isReversed: boolean;
};

export default function DailyDrawPage() {
  const [drawnCard, setDrawnCard] = useState<DrawnCard | null>(null);
  const [cardKey, setCardKey] = useState(Date.now().toString());

  const drawCard = () => {
    // Select a new card randomly
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    const isReversed = Math.random() > 0.5;
    const card = tarotDeck[randomIndex];
    setDrawnCard({ card, isReversed });
    setCardKey(Date.now().toString());
  };
  
  useEffect(() => {
    // Draw a card on initial load for a better user experience
    drawCard(); 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Card of the Day</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        Draw a single tarot card for daily insights and guidance. Focus on a question or simply open your mind to receive the day's message.
      </p>

      <div className="mb-8 w-60 h-[350px] flex items-center justify-center">
        {drawnCard ? (
          <div className="w-full h-full">
            <TarotCard
              card={drawnCard.card}
              isReversed={drawnCard.isReversed}
              cardKey={cardKey}
            />
          </div>
        ) : (
          <div className="w-full h-full border-2 border-dashed border-accent/30 rounded-xl flex items-center justify-center text-muted-foreground">
            Your card awaits
          </div>
        )}
      </div>

      <Button onClick={drawCard} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
        {drawnCard ? 'Draw Another Card' : 'Draw Your Card'}
      </Button>

      {drawnCard && (
        <div className="mt-8 text-center animate-in fade-in duration-500">
          <h2 className="text-3xl font-bold font-headline">{drawnCard.card.name}</h2>
          {drawnCard.isReversed && <p className="text-accent text-sm">(Reversed)</p>}
          <Button asChild variant="link" className="text-lg text-accent mt-2">
            <Link href={`/library/${encodeURIComponent(drawnCard.card.name)}`}>
              View Interpretation
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
