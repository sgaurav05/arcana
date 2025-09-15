import Image from 'next/image';
import { getCardByName, TarotCardData } from '@/lib/tarot-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import { getCardInterpretation } from '@/ai/flows/card-interpretations-with-reasoning';
import { InterpretationClient } from './InterpretationClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const dynamic = 'force-dynamic';

async function getInitialInterpretations(card: TarotCardData) {
  const [upright, reversed] = await Promise.all([
    getCardInterpretation({ cardName: card.name, isReversed: false }),
    getCardInterpretation({ cardName: card.name, isReversed: true }),
  ]);
  return { upright, reversed };
}

export default async function CardDetailPage({ params }: { params: { cardName: string } }) {
  const cardName = decodeURIComponent(params.cardName);
  const card = getCardByName(cardName);

  if (!card) {
    notFound();
  }

  const cardImage = PlaceHolderImages.find((img) => img.id === card.id);
  const interpretations = await getInitialInterpretations(card);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4 text-center">
            {card.name}
          </h1>
          <div className="w-full max-w-[300px] mx-auto sticky top-24">
            <Image
              src={cardImage?.imageUrl || 'https://picsum.photos/seed/default/300/525'}
              alt={card.name}
              width={300}
              height={525}
              data-ai-hint={cardImage?.imageHint}
              className="rounded-xl shadow-lg shadow-accent/10 border-2 border-accent/50"
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card className="bg-card/50 border-accent/30">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-accent/90">Upright Meaning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{interpretations.upright.interpretation}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-accent/30">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-accent/90">Reversed Meaning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{interpretations.reversed.interpretation}</p>
            </CardContent>
          </Card>

          <Separator className="my-8 border-accent/20" />
          
          <InterpretationClient cardName={card.name} />
        </div>
      </div>
    </div>
  );
}
