import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

export default function MainSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
