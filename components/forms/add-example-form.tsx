'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addExample } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AddExampleForm(props: { word_text: string }) {
  const [state, formAction] = useActionState(addExample, {});
  const form = useForm();

  useEffect(() => {
    form.setValue('word_text', props.word_text, { shouldValidate: true });
  }, []);

  return (
    <Form {...form}>
      <form action={formAction} className="m-4 max-w-96 space-y-8 md:min-w-72">
        <FormField
          control={form.control}
          name="example_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Example</FormLabel>
              <FormControl>
                <Input placeholder="write an example" {...field} />
              </FormControl>
              <FormDescription>Write an example of the word.</FormDescription>
              <FormMessage>{state.errors?.example_text}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="example_reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference</FormLabel>
              <FormControl>
                <Input placeholder="write your reference, if any." {...field} />
              </FormControl>
              <FormDescription>
                Did you read or hear that example, for intance, from any book or movie?
              </FormDescription>
              <FormMessage>{state.errors?.example_reference}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Add Example</Button>
        {state.message && (
          <Alert
            variant={state.message.type == 'error' && 'destructive'}
            className={state.message.type == 'success' ? 'border-green-600 text-green-600' : ''}
          >
            <AlertDescription>{state.message.text}</AlertDescription>
          </Alert>
        )}
        <span className="hidden">
          <FormField
            control={form.control}
            name="word_text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="write the word" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </span>
      </form>
    </Form>
  );
}
