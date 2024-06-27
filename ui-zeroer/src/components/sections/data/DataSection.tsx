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

export function DataSection() {
  const { data } = useGetData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <DataTable columns={dataColumns} data={data ?? []} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
