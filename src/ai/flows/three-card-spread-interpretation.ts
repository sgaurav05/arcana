'use server';
/**
 * @fileOverview Provides an AI-driven interpretation of a three-card tarot spread (Past, Present, Future).
 *
 * - getThreeCardSpreadInterpretation - A function that provides a cohesive interpretation of the three cards.
 * - ThreeCardSpreadInterpretationInput - The input type for the function.
 * - ThreeCardSpreadInterpretationOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CardInputSchema = z.object({
  cardName: z.string().describe('The name of the tarot card.'),
  isReversed: z.boolean().describe('Whether the card is reversed.'),
});

const ThreeCardSpreadInterpretationInputSchema = z.object({
  pastCard: CardInputSchema.describe('The card representing the Past.'),
  presentCard: CardInputSchema.describe('The card representing the Present.'),
  futureCard: CardInputSchema.describe('The card representing the Future.'),
});
export type ThreeCardSpreadInterpretationInput = z.infer<typeof ThreeCardSpreadInterpretationInputSchema>;

const ThreeCardSpreadInterpretationOutputSchema = z.object({
  interpretation: z
    .string()
    .describe('A detailed and cohesive interpretation of the three-card spread, explaining the story from past to future.'),
});
export type ThreeCardSpreadInterpretationOutput = z.infer<typeof ThreeCardSpreadInterpretationOutputSchema>;

export async function getThreeCardSpreadInterpretation(input: ThreeCardSpreadInterpretationInput): Promise<ThreeCardSpreadInterpretationOutput> {
  return threeCardSpreadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'threeCardSpreadPrompt',
  input: {schema: ThreeCardSpreadInterpretationInputSchema},
  output: {schema: ThreeCardSpreadInterpretationOutputSchema},
  prompt: `You are an expert tarot reader interpreting a three-card spread for a user. The positions are Past, Present, and Future.

  - Past: {{pastCard.cardName}} ({{#if pastCard.isReversed}}Reversed{{else}}Upright{{/if}})
  - Present: {{presentCard.cardName}} ({{#if presentCard.isReversed}}Reversed{{else}}Upright{{/if}})
  - Future: {{futureCard.cardName}} ({{#if futureCard.isReversed}}Reversed{{else}}Upright{{/if}})
  
  Your task is to weave these three cards into a single, cohesive narrative.
  
  1.  Start by briefly explaining the Past card's influence on the current situation.
  2.  Then, analyze the Present card and how it reflects the user's current state, connecting it to the past influence.
  3.  Finally, interpret the Future card as the potential outcome or advice based on the progression from past to present.
  
  Provide a thoughtful, flowing interpretation that tells a story, rather than just listing the meanings of individual cards.
  `,
});

const threeCardSpreadFlow = ai.defineFlow(
  {
    name: 'threeCardSpreadFlow',
    inputSchema: ThreeCardSpreadInterpretationInputSchema,
    outputSchema: ThreeCardSpreadInterpretationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
