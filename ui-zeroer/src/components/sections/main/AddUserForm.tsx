import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserIcon, PhoneIcon, HashtagIcon, MapIcon } from '@heroicons/react/solid';
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
import {
  type TFormKey,
  formSchema,
  type TAPIMutFunc,
  type TFormData,
  formDefaultValues,
  placeholders,
} from './schema';
import { cn } from '@/lib/utils';
import { Building2Icon } from 'lucide-react';

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
    defaultValues: formDefaultValues,
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
                <div className='mb-4 grid grid-cols-8 gap-2'>
                  <FormLabel className='relative col-span-1 grid grid-cols-2 content-center'>
                    {key === 'id' && <HashtagIcon className='mr-2 size-5 text-purple-500' />}
                    {key === 'name' && <UserIcon className='mr-2 size-5 text-purple-500' />}
                    {key === 'address' && <MapIcon className='mr-2 size-5 text-purple-500' />}
                    {key === 'city' && <Building2Icon className='mr-2 size-5 text-purple-500' />}
                    {key === 'phone' && <PhoneIcon className='mr-2 size-5 text-purple-500' />}
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <div className='relative left-1 col-span-7'>
                      <Input
                        className={cn(
                          form.getFieldState(key as TFormKey).error &&
                            'ring-1 ring-destructive focus-visible:ring-destructive'
                        )}
                        {...field}
                        placeholder={placeholders[key as keyof TFormData]}
                      />
                      <FormMessage className='absolute -bottom-6 right-0' />
                    </div>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        ))}
        <Button className='mx-auto w-1/2' type='submit'>
          Add Client
        </Button>
      </form>
    </Form>
  );
}
