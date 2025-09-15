'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Sparkles, WandSparkles } from 'lucide-react';

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
import { getCustomQuestionAnswer } from '@/app/actions';

const formSchema = z.object({
  question: z.string().min(10, {
    message: 'Please ask a question of at least 10 characters.',
  }),
});

export default function AskQuestionPage() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await getCustomQuestionAnswer({
      question: values.question,
    });

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || 'An unexpected error occurred.');
    }
    
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col items-center text-center py-10 max-w-4xl mx-auto">
      <WandSparkles className="w-16 h-16 text-accent mb-4" />
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent mb-4">Ask the Cards</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Pose any question to the universe. Whether it's about your career, a relationship, or a future event, the cards hold a perspective for you. Be as specific as you like, including dates and times.
      </p>

      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Your Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'What should I know about the opportunity that arises in late July?' or 'Is moving to a new city on October 15th the right choice for me?'"
                      className="resize-none min-h-[120px] text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? 'Consulting the cosmos...' : 'Receive Guidance'}
              {!isLoading && <Sparkles className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </Form>

        {error && (
          <Card className="mt-8 border-destructive bg-destructive/20 text-left">
              <CardHeader>
                  <CardTitle className="text-destructive-foreground">An Error Occurred</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-destructive-foreground">{error}</p>
              </CardContent>
          </Card>
        )}

        {result && (
          <Card className="mt-8 bg-card/80 border-accent/50 animate-in fade-in duration-500 text-left">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-accent/90 flex items-center gap-2">
                  <Sparkles />
                  Cosmic Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap text-base leading-relaxed">{result}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
