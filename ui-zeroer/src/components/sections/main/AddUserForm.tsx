import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { type TFormKey, formSchema, type TAPIMutFunc, type TFormData } from './schema';

type AddUserFormProps = {
  postToBackend: TAPIMutFunc;
  error: Error | null;
  isPending: boolean;
  isSuccess: boolean;
};

export function AddUserForm({ postToBackend }: AddUserFormProps) {
  // 1. Define your form.
  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      name: '',
      // balance: '',
      address: '',
      city: '',
      phone: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: TFormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    form.reset();
    postToBackend(values);
  }
  //how to map zod object to form fields

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6 p-6 pt-0'>
        {Object.keys(formSchema.shape).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key as TFormKey}
            render={({ field }) => (
              <FormItem className='grid gap-1'>
                <div className='relative w-full'>
                  <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                  <FormMessage className='absolute right-0 top-0.5' />
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
