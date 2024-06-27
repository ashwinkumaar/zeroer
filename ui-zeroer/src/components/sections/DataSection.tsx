import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export default function DataSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
