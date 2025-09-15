'use server';
/**
 * @fileOverview Provides detailed tarot card meanings, both upright and reversed, with personalized insights from an LLM reasoning tool.
 *
 * - getCardInterpretation - A function that retrieves card interpretations and insights.
 * - CardInterpretationInput - The input type for the getCardInterpretation function.
 * - CardInterpretationOutput - The return type for the getCardInterpretation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CardInterpretationInputSchema = z.object({
  cardName: z.string().describe('The name of the tarot card.'),
  isReversed: z.boolean().describe('Whether the card is reversed or not.'),
  userQuery: z
    .string()
    .optional()
    .describe('Optional user query providing context for the card reading.'),
});
export type CardInterpretationInput = z.infer<typeof CardInterpretationInputSchema>;

const CardInterpretationOutputSchema = z.object({
  cardName: z.string().describe('The name of the tarot card.'),
  interpretation: z.string().describe('Detailed interpretation of the card.'),
  relevantInsights: z
    .string()
    .optional()
    .describe('Personalized insights based on the user query.'),
});
export type CardInterpretationOutput = z.infer<typeof CardInterpretationOutputSchema>;

export async function getCardInterpretation(input: CardInterpretationInput): Promise<CardInterpretationOutput> {
  return cardInterpretationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cardInterpretationPrompt',
  input: {schema: CardInterpretationInputSchema},
  output: {schema: CardInterpretationOutputSchema},
  prompt: `You are a tarot card expert providing detailed interpretations.

  Provide a detailed interpretation of the {{cardName}} card when {{#if isReversed}} reversed {{else}} upright {{/if}}.

  {{#if userQuery}}
  Based on the user's query: {{{userQuery}}}, provide relevant insights connecting the card interpretation to their specific situation.
  Focus on which aspects of the card interpretation are most helpful and applicable to the user's context.
  {{/if}}

  Ensure the interpretation and insights are clear, helpful, and insightful.
  `,
});

const cardInterpretationFlow = ai.defineFlow(
  {
    name: 'cardInterpretationFlow',
    inputSchema: CardInterpretationInputSchema,
    outputSchema: CardInterpretationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
