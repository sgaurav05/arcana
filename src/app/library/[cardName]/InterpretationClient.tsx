'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPersonalizedInterpretation } from '@/app/actions';

const formSchema = z.object({
  userQuery: z.string().min(10, {
    message: 'Please describe your situation in at least 10 characters.',
  }),
  isReversed: z.boolean().default(false),
});

interface InterpretationClientProps {
  cardName: string;
}

export function InterpretationClient({ cardName }: InterpretationClientProps) {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userQuery: '',
      isReversed: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await getPersonalizedInterpretation({
      cardName,
      userQuery: values.userQuery,
      isReversed: values.isReversed,
    });

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || 'An unexpected error occurred.');
    }
    
    setIsLoading(false);
  }

  return (
    <div>
      <h2 className="text-3xl font-headline font-bold text-accent mb-4">Personalized Insights</h2>
      <p className="text-muted-foreground mb-6">
        To get a more personal interpretation, describe your current situation or question below. Our mystical AI will connect the card's meaning to your context.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userQuery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Situation or Question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'I'm starting a new job and feeling anxious' or 'What should I focus on in my relationship?'"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="isReversed" {...form.register('isReversed')} className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
            <label htmlFor="isReversed" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Consider reversed meaning?
            </label>
           </div>

          <Button type="submit" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? 'Consulting the cosmos...' : 'Reveal My Insight'}
            {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </Form>

      {error && (
         <Card className="mt-6 border-destructive bg-destructive/20">
            <CardHeader>
                <CardTitle className="text-destructive-foreground">An Error Occurred</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-destructive-foreground">{error}</p>
            </CardContent>
         </Card>
      )}

      {result && (
        <Card className="mt-6 bg-card/80 border-accent/50 animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-accent/90 flex items-center gap-2">
                <Sparkles />
                Your Personalized Reading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
