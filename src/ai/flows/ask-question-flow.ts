'use server';
/**
 * @fileOverview Provides answers to user questions, incorporating tarot wisdom and interpreting dates/times.
 *
 * - getQuestionAnswer - A function that provides a tarot-inspired answer to a user's question.
 * - QuestionAnswerInput - The input type for the getQuestionAnswer function.
 * - QuestionAnswerOutput - The return type for the getQuestionAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const QuestionAnswerInputSchema = z.object({
  question: z.string().describe('The specific question the user is asking.'),
});
export type QuestionAnswerInput = z.infer<typeof QuestionAnswerInputSchema>;

const QuestionAnswerOutputSchema = z.object({
  answer: z
    .string()
    .describe('A detailed, insightful answer to the user\'s question, drawing on tarot themes. If the question includes dates or times, interpret their significance.'),
});
export type QuestionAnswerOutput = z.infer<typeof QuestionAnswerOutputSchema>;

export async function getQuestionAnswer(input: QuestionAnswerInput): Promise<QuestionAnswerOutput> {
  return askQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askQuestionPrompt',
  input: {schema: QuestionAnswerInputSchema},
  output: {schema: QuestionAnswerOutputSchema},
  prompt: `You are a wise and empathetic tarot reader providing guidance. A user has a specific question.

  User's Question: "{{{question}}}"

  Your task is to provide a thoughtful and insightful answer. Draw upon the wisdom and symbolism of the tarot to frame your response.
  
  If the user's question includes a specific date, time, or timeframe (e.g., "next month," "on my birthday," "in the summer"), you MUST incorporate the significance of that timing into your answer. Consider numerology, astrology, or seasonal energies related to the date if applicable.
  
  Provide a clear, helpful, and encouraging answer that directly addresses the user's question.
  `,
});

const askQuestionFlow = ai.defineFlow(
  {
    name: 'askQuestionFlow',
    inputSchema: QuestionAnswerInputSchema,
    outputSchema: QuestionAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
