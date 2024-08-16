'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Flag } from 'lucide-react';

import { Report } from '@/lib/actions';
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

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from "@/components/ui/use-toast"

type Props = {
  word_text: string;
}

export function ReportForm(props: Props) {
  const [state, formAction] = useActionState(Report, { message: {text: ""} });
  const form = useForm();
  const { toast } = useToast();

  useEffect(() => {
    form.setValue('word_text', props.word_text, { shouldValidate: true });
    form.setValue('report_element', props.report_element, { shouldValidate: true });
    const variant = state.message.type === "error" && "destructive"
    toast({ title: state.message.text, variant })
  }, [state.message])

  return (
    <Form {...form}>
      <form action={formAction} className="m-4 max-w-96 space-y-8 md:min-w-72">
        <button className="text-red-500 opacity-25 hover:opacity-100" type="submit"><Flag /></button>
        <span className="hidden">
          <FormField
            control={form.control}
            name="word_text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="report_element"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </span>
      </form>
    </Form>
  );
}
