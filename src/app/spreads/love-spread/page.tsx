'use client';

import { useState, useEffect } from 'react';
import { tarotDeck, TarotCardData } from '@/lib/tarot-data';
import { Button } from '@/components/ui/button';
import { TarotCard } from '@/components/TarotCard';
import Link from 'next/link';
import { Heart, Sparkles } from 'lucide-react';
import { LoveLogo } from '@/components/LoveLogo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLoveSpreadInterpretation } from '@/app/actions';

type DrawnCard = {
  card: TarotCardData;
  isReversed: boolean;
};

const spreadPositions = ['You', 'Your Partner', 'The Relationship'];

export default function LoveSpreadPage() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedState = sessionStorage.getItem('loveSpreadState');
    if (storedState) {
        try {
            const parsedState = JSON.parse(storedState);
             if (Array.isArray(parsedState.cards) && parsedState.cards.length === 3) {
                setDrawnCards(parsedState.cards);
                setInterpretation(parsedState.interpretation || null);
                setIsFlipped(true);
                return;
            }
        } catch (e) {
            console.error("Failed to parse stored love spread state", e);
            sessionStorage.removeItem('loveSpreadState');
        }
    } else {
      drawSpread();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawSpread = () => {
    setInterpretation(null);
    setError(null);
    setIsFlipped(false);
    setTimeout(() => {
        const newDrawnCards: DrawnCard[] = [];
        const usedIndices = new Set<number>();
        const deck = [...tarotDeck];

        while (newDrawnCards.length < 3) {
            const randomIndex = Math.floor(Math.random() * deck.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                const isReversed = Math.random() > 0.5;
                newDrawnCards.push({ card: deck[randomIndex], isReversed });
            }
        }
        setDrawnCards(newDrawnCards);
        sessionStorage.setItem('loveSpreadState', JSON.stringify({ cards: newDrawnCards, interpretation: null }));
        setIsFlipped(true);
    }, 500);
  };
  
  const handleGetInterpretation = async () => {
    if (drawnCards.length < 3) return;
    
    setIsLoading(true);
    setError(null);
    setInterpretation(null);

    const input = {
      youCard: { cardName: drawnCards[0].card.name, isReversed: drawnCards[0].isReversed },
      partnerCard: { cardName: drawnCards[1].card.name, isReversed: drawnCards[1].isReversed },
      relationshipCard: { cardName: drawnCards[2].card.name, isReversed: drawnCards[2].isReversed },
    };

    const response = await getLoveSpreadInterpretation(input);

    if (response.success && response.data) {
      setInterpretation(response.data);
       const currentState = JSON.parse(sessionStorage.getItem('loveSpreadState') || '{}');
      sessionStorage.setItem('loveSpreadState', JSON.stringify({ ...currentState, interpretation: response.data }));
    } else {
      setError(response.error || 'An unexpected error occurred.');
    }

    setIsLoading(false);
  };

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
              {drawnCards[index] && (
                  <TarotCard
                    key={`${drawnCards[index].card.id}-${drawnCards[index].isReversed}`}
                    card={drawnCards[index].card}
                    isReversed={drawnCards[index].isReversed}
                    isFlipped={isFlipped}
                  />
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

       <div className="flex gap-4">
        <Button onClick={drawSpread} size="lg" variant="outline">
          <Heart className="mr-2" />
          {drawnCards.length > 0 ? 'Draw a New Love Spread' : 'Draw Your Love Cards'}
        </Button>
         {drawnCards.length > 0 && !interpretation && (
           <Button onClick={handleGetInterpretation} size="lg" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
             {isLoading ? 'Interpreting the connection...' : 'Get My Reading'}
             {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
           </Button>
        )}
      </div>

       {error && (
          <Card className="mt-8 border-destructive bg-destructive/20 text-left w-full max-w-4xl">
              <CardHeader>
                  <CardTitle className="text-destructive-foreground">An Error Occurred</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-destructive-foreground">{error}</p>
              </CardContent>
          </Card>
      )}

      {interpretation && (
        <Card className="mt-8 bg-card/80 border-accent/50 animate-in fade-in duration-500 text-left w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-accent/90 flex items-center gap-2">
                <Sparkles />
                Your Love Reading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap text-base leading-relaxed">{interpretation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
