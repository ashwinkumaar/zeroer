import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { DataTable } from '../ui/data-table';
import { dataColumns } from './data/columns';
import { useGetData } from './data/data';

export default function DataSection() {
  const { data, error: _error, isLoading: _loading } = useGetData();
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
