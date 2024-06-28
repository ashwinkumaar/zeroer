import { Table } from '@tanstack/react-table';
import { FC } from 'react';

import { DataType } from './columns';
import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

type TableFilterProps = {
  table: Table<DataType>;
};

export const TableFilter: FC<TableFilterProps> = ({ table: _table }) => {
  return (
    <div className='flex w-full grow flex-col gap-2 rounded-md border p-3 shadow-sm'>
      <div className='flex px-2'>
        <span className='text-sm font-medium'>Add a filtered view</span>
      </div>
      <form className='flex grow flex-row place-items-center justify-between gap-2 rounded-md border p-3 shadow-sm'>
        <div className='flex flex-row justify-evenly gap-4 text-sm'>
          <div>Filter 1</div>
          <div>Filter 2</div>
          <div>Filter 3</div>
          <div>Filter 4</div>
          <div>Filter 5</div>
        </div>
        <Button className='flex flex-row gap-2 disabled:cursor-not-allowed' type='submit' disabled>
          <MagnifyingGlassIcon />
          <span>Search</span>
        </Button>
      </form>
    </div>
  );
};
