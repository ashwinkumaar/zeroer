import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Get from API∏
const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  addr: z.string(),
  city: z.string(),
  phone: z.string(),
});

export function AddUserForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      name: '',
      // balance: '',
      addr: '',
      city: '',
      phone: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  //how to map zod object to form fields

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {Object.keys(formSchema.shape).map((key) => (
          <FormField
            control={form.control}
            name={key as keyof typeof formSchema.shape}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button className='' type='submit'>
          Add user
        </Button>
      </form>
    </Form>
  );
}
