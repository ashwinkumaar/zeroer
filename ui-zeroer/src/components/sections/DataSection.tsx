import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { DataTable } from '../ui/data-table';
import { dataColumns } from './data/columns';

export default function DataSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <DataTable columns={dataColumns} data={[]} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
