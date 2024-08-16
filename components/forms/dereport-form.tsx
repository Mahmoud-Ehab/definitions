'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Flag } from 'lucide-react';

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
import { ToastAction } from "@/components/ui/toast"

import { Dereport } from '@/lib/report-actions';

type Props = {
  word_text: string;
  report_element: string;
  element_id: string;
}

export function DereportForm(props: Props) {
  const [state, formAction] = useActionState(Dereport, { message: {text: ""} });
  const form = useForm();
  const { toast } = useToast();

  useEffect(() => {
    form.setValue('word_text', props.word_text, { shouldValidate: true });
    form.setValue('report_element', props.report_element, { shouldValidate: true });
    form.setValue('element_id', props.element_id, { shouldValidate: true });
    if (state.message?.text?.length > 0) {
      toast({ 
        title: state.message.text, 
        variant: state.message.type === "error" && "destructive",
      })
    }
  }, [state.message])

  return (
    <Form {...form}>
      <form action={formAction}>
        <Button variant="ghost" className="text-sm text-red-500 hover:opacity-100" type="submit">undo</Button>
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
          <FormField
            control={form.control}
            name="element_id"
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
