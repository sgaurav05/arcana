'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { TarotCardData } from '@/lib/tarot-data';
import { useState, useEffect } from 'react';

interface TarotCardProps {
  card: TarotCardData;
  isReversed?: boolean;
  className?: string;
  cardKey: string;
}

export function TarotCard({ card, isReversed = false, className, cardKey }: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardImage = PlaceHolderImages.find((img) => img.id === card.id);
  const cardBackImage = PlaceHolderImages.find((img) => img.id === 'card-back');

  useEffect(() => {
    const timer = setTimeout(() => setIsFlipped(true), 100);
    return () => clearTimeout(timer);
  }, [cardKey]);

  return (
    <div className={cn('group [perspective:1000px]', className)}>
      <div
        key={cardKey}
        className={cn(
          'relative h-full w-full rounded-xl shadow-lg transition-all duration-700 [transform-style:preserve-3d]',
          { '[transform:rotateY(180deg)]': isFlipped }
        )}
      >
        {/* Back Face (initially visible) */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <Image
            src={cardBackImage?.imageUrl || 'https://picsum.photos/seed/tarot-back/300/525'}
            alt="Tarot card back"
            width={300}
            height={525}
            data-ai-hint={cardBackImage?.imageHint}
            className="h-full w-full object-cover rounded-xl border-2 border-accent/50"
            priority
          />
        </div>

        {/* Front Face (hidden until flipped) */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <Image
            src={cardImage?.imageUrl || 'https://picsum.photos/seed/default/300/525'}
            alt={card.name}
            width={300}
            height={525}
            data-ai-hint={cardImage?.imageHint}
            className={cn(
                'h-full w-full object-cover rounded-xl border-2 border-accent/50',
                { 'rotate-180': isReversed }
            )}
          />
        </div>
      </div>
    </div>
  );
}
