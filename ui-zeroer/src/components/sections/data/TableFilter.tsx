import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { DataType } from './columns';
import { TFilterSchema, TFilterSchemaKey, filterDefaultValues, filterSchema } from './schema';
import { Input } from '@/components/ui/input';

type TableFilterProps = {
  table: Table<DataType>;
};

export const TableFilter: FC<TableFilterProps> = ({ table: _table }) => {
  const form = useForm<TFilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: filterDefaultValues,
  });

  function onSubmit(values: TFilterSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    form.reset();
    const params = new URLSearchParams({ view: 'data' });
    for (const key in values) {
      if (values[key as TFilterSchemaKey]) {
        params.set(key, values[key as TFilterSchemaKey]);
      }
    }
    window.location.assign(`/?${params}`);
  }

  return (
    <div className='flex w-full grow flex-col gap-2 rounded-md border p-3 shadow-sm'>
      <div className='flex px-2'>
        <span className='text-sm font-medium'>Search for entities matching a user:</span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex grow flex-row place-items-end justify-between gap-4 rounded-md border p-3 shadow-sm'
        >
          {Object.keys(filterSchema.shape).map((key) => (
            <FormField
              control={form.control}
              key={key}
              name={key as TFilterSchemaKey}
              render={({ field }) => (
                <FormItem>
                  <FormControl className=''>
                    <div className='flex flex-col gap-1'>
                      <FormLabel>{key.replace(/\w/, (c) => c.toUpperCase())}</FormLabel>
                      <Input placeholder='' {...field} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <Button
            className='flex flex-row gap-2 disabled:cursor-not-allowed'
            type='submit'
            // disabled
          >
            <MagnifyingGlassIcon />
            <span>Search</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};
