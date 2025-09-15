'use server';

import { getCardInterpretation, CardInterpretationInput } from '@/ai/flows/card-interpretations-with-reasoning';
import { getQuestionAnswer, QuestionAnswerInput } from '@/ai/flows/ask-question-flow';
import { getThreeCardSpreadInterpretation, ThreeCardSpreadInterpretationInput } from '@/ai/flows/three-card-spread-interpretation';
import { getLoveSpreadInterpretation as getLoveSpreadInterpretationFlow, LoveSpreadInterpretationInput } from '@/ai/flows/love-spread-interpretation';

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

export async function getCustomQuestionAnswer(input: QuestionAnswerInput): Promise<ActionResult> {
  try {
    const result = await getQuestionAnswer(input);
    return { success: true, data: result.answer };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Failed to receive guidance from the ethereal plane. Please try again.' };
  }
}

export async function getThreeCardInterpretation(input: ThreeCardSpreadInterpretationInput): Promise<ActionResult> {
  try {
    const result = await getThreeCardSpreadInterpretation(input);
    return { success: true, data: result.interpretation };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Failed to interpret the spread. Please try again.' };
  }
}

export async function getLoveInterpretation(input: LoveSpreadInterpretationInput): Promise<ActionResult> {
  try {
    const result = await getLoveSpreadInterpretationFlow(input);
    return { success: true, data: result.interpretation };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Failed to interpret the love spread. Please try again.' };
  }
}
