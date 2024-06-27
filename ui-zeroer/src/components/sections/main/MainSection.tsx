import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AddUserForm } from './AddUser';

export function MainSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <AddUserForm />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
