import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';

import { dataColumns } from './columns';
import { useGetData } from './data';
import { TableFilter } from './TableFilter';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataGraph } from './DataGraph';

export function DataSection() {
  const { data, isLoading, filterFields } = useGetData();
  const [isTable, setIsTable] = useState(true);
  return (
    <Card>
      <CardHeader className='flex flex-row'>
        <div className='flex grow flex-col gap-4'>
          <CardTitle>Data</CardTitle>
          <CardDescription>
            View the closest matching clients from the existing databases
          </CardDescription>
        </div>
        <Button onClick={() => setIsTable(!isTable)}>
          {isTable ? 'Show Graph' : 'Show Table'}
        </Button>
      </CardHeader>
      <CardContent className='space-y-2'>
        {isTable ? (
          <DataTable
            columns={dataColumns}
            data={data ?? []}
            isLoading={isLoading}
            filterState={filterFields}
            customFilterComponent={TableFilter}
          />
        ) : (
          <DataGraph />
        )}
      </CardContent>
      <CardFooter />
    </Card>
  );
}
