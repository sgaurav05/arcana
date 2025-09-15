'use server';
/**
 * @fileOverview Provides an AI-driven interpretation of a three-card love spread.
 *
 * - getLoveSpreadInterpretation - A function that provides a cohesive interpretation of the three cards in a relationship context.
 * - LoveSpreadInterpretationInput - The input type for the function.
 * - LoveSpreadInterpretationOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CardInputSchema = z.object({
  cardName: z.string().describe('The name of the tarot card.'),
  isReversed: z.boolean().describe('Whether the card is reversed.'),
});

const LoveSpreadInterpretationInputSchema = z.object({
  youCard: CardInputSchema.describe("The card representing the person asking."),
  partnerCard: CardInputSchema.describe("The card representing their partner."),
  relationshipCard: CardInputSchema.describe("The card representing the dynamic of the relationship itself."),
});
export type LoveSpreadInterpretationInput = z.infer<typeof LoveSpreadInterpretationInputSchema>;

const LoveSpreadInterpretationOutputSchema = z.object({
  interpretation: z
    .string()
    .describe('A detailed and cohesive interpretation of the love spread, explaining the dynamic between the two people and the relationship.'),
});
export type LoveSpreadInterpretationOutput = z.infer<typeof LoveSpreadInterpretationOutputSchema>;

export async function getLoveSpreadInterpretation(input: LoveSpreadInterpretationInput): Promise<LoveSpreadInterpretationOutput> {
  return loveSpreadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'loveSpreadPrompt',
  input: {schema: LoveSpreadInterpretationInputSchema},
  output: {schema: LoveSpreadInterpretationOutputSchema},
  prompt: `You are an expert tarot reader specializing in relationships. You are interpreting a three-card love spread.

  - Card 1 (You): {{youCard.cardName}} ({{#if youCard.isReversed}}Reversed{{else}}Upright{{/if}})
  - Card 2 (Your Partner): {{partnerCard.cardName}} ({{#if partnerCard.isReversed}}Reversed{{else}}Upright{{/if}})
  - Card 3 (The Relationship): {{relationshipCard.cardName}} ({{#if relationshipCard.isReversed}}Reversed{{else}}Upright{{/if}})
  
  Your task is to provide a compassionate and insightful interpretation of this spread.
  
  1.  Analyze the "You" card to describe the questioner's energy, feelings, and role in the relationship.
  2.  Analyze the "Your Partner" card to describe the partner's energy, feelings, and role.
  3.  Analyze "The Relationship" card as the central dynamic, outcome, or core theme of the connection. Explain how the first two cards contribute to or are influenced by this central energy.
  
  Weave the meanings together to create a holistic view of the relationship. Focus on the interplay between the cards.
  `,
});

const loveSpreadFlow = ai.defineFlow(
  {
    name: 'loveSpreadFlow',
    inputSchema: LoveSpreadInterpretationInputSchema,
    outputSchema: LoveSpreadInterpretationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
