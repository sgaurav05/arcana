'use server';

import { getCardInterpretation, CardInterpretationInput } from '@/ai/flows/card-interpretations-with-reasoning';

type ActionResult = {
  success: boolean;
  data?: string | null;
  error?: string | null;
};

export async function getPersonalizedInterpretation(input: CardInterpretationInput): Promise<ActionResult> {
  try {
    const result = await getCardInterpretation(input);
    if (!result.relevantInsights) {
      return { success: true, data: "The cosmos didn't have specific insights for your query based on this card, but you can reflect on the general meaning provided." };
    }
    return { success: true, data: result.relevantInsights };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Failed to consult the mystical energies. Please try again later.' };
  }
}
