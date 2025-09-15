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

const spreadPositions = ['Past', 'Present', 'Future'];

// Function to get initial state from sessionStorage, runs only on the client
const getInitialState = (): DrawnCard[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const storedState = sessionStorage.getItem('threeCardState');
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            if (Array.isArray(parsedState) && parsedState.length === 3 && parsedState.every(item => item.card && typeof item.isReversed === 'boolean')) {
                return parsedState;
            }
        }
    } catch (e) {
        console.error("Failed to parse stored three-card state", e);
    }
    return [];
};


export default function ThreeCardSpreadPage() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [cardKey, setCardKey] = useState(Date.now().toString());

  useEffect(() => {
    // Initialize state from session storage or draw new cards
    const initialState = getInitialState();
    if (initialState.length > 0) {
      setDrawnCards(initialState);
    } else {
      drawSpread();
    }
  }, []);

  useEffect(() => {
    // Save state to session storage whenever it changes
    if (drawnCards.length > 0) {
      sessionStorage.setItem('threeCardState', JSON.stringify(drawnCards));
    }
  }, [drawnCards]);

  const drawSpread = () => {
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
    setCardKey(Date.now().toString());
  };

  return (
    <div className="flex flex-col items-center text-center py-10">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Three-Card Spread</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
        Explore the energies of your past, present, and future. This spread offers a snapshot of your life's journey and potential path forward.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 mb-8 w-full max-w-4xl">
        {spreadPositions.map((position, index) => (
          <div key={`${drawnCards[index]?.card.id}-${index}`} className="flex flex-col items-center">
            <h2 className="text-2xl font-headline text-accent mb-4">{position}</h2>
            <div className="w-60 h-[350px]">
              {drawnCards[index] ? (
                <TarotCard
                  card={drawnCards[index].card}
                  isReversed={drawnCards[index].isReversed}
                  cardKey={`${cardKey}-${index}`}
                />
              ) : (
                <div className="w-full h-full border-2 border-dashed border-accent/30 rounded-xl" />
              )}
            </div>
            {drawnCards[index] && (
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
        {drawnCards.length > 0 ? 'Draw a New Spread' : 'Draw Your Cards'}
      </Button>
    </div>
  );
}
