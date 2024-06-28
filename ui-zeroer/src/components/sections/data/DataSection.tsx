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

export function DataSection() {
  const { data, isLoading, filterFields } = useGetData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardDescription>View the existing entities in the dataset.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <DataTable
          columns={dataColumns}
          data={data ?? []}
          isLoading={isLoading}
          filterState={filterFields}
          customFilterComponent={TableFilter}
        />
      </CardContent>
      <CardFooter />
    </Card>
  );
}
