import Link from 'next/link';
import Image from 'next/image';
import { tarotDeck, Arcana } from '@/lib/tarot-data';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const arcanas: Arcana[] = ['Major', 'Wands', 'Cups', 'Swords', 'Pentacles'];

export default function LibraryPage() {
  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4 text-center">Card Library</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
        Explore the rich symbolism and meanings of all 78 cards in the tarot deck. Click on any card to reveal its upright and reversed interpretations.
      </p>

      {arcanas.map((arcana) => (
        <section key={arcana} className="mb-12">
          <h2 className="text-3xl font-headline font-bold text-accent/80 mb-6 border-b-2 border-accent/20 pb-2">{arcana} Arcana</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {tarotDeck.filter(card => card.arcana === arcana).map(card => {
              const cardImage = PlaceHolderImages.find((img) => img.id === card.id);
              return (
                <Link href={`/library/${encodeURIComponent(card.name)}`} key={card.id}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 border-accent/30 bg-card/50">
                    <CardContent className="p-0">
                      <Image
                        src={cardImage?.imageUrl || 'https://picsum.photos/seed/default/300/525'}
                        alt={card.name}
                        width={300}
                        height={525}
                        data-ai-hint={cardImage?.imageHint}
                        className="w-full h-auto aspect-[300/525] object-cover"
                      />
                      <p className="font-semibold text-center p-2 truncate">{card.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
