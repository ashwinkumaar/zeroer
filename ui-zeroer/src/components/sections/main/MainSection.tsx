import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { AddUserForm } from './AddUserForm';
import { TFormData } from './schema';

export function MainSection() {
  const { toast } = useToast();
  const {
    mutate: postToBackend,
    reset: resetMutationState,
    error,
    isPending,
    isSuccess,
    variables,
  } = useMutation({
    mutationFn: async (data: TFormData) => {
      const { name, address: addr, phone, city } = data;

      const response = await fetch('http://127.0.0.1:5000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          addr,
          phone,
          city,
        }),
      });
      if (response.ok) {
        const { data } = await response.json();
        if (data.name) {
          toast({
            variant: 'default',
            title: 'Add User Success',
            description: 'Success! Showing 5 nearest matches now',
            duration: 2500,
          });
          setTimeout(() => {
            window.location.assign(`/?view=data&name=${data.name}`);
          }, 3000);
        }
      } else {
        throw new Error(await response.text());
      }
    },
  });

  return (
    <div className='flex flex-row gap-6'>
      <Card className='w-full p-0'>
        <CardHeader className='px-6 pt-6'>
          <CardTitle className='mx-6'>Please fill in client details and submit</CardTitle>
        </CardHeader>
        <CardContent className=''>
          <AddUserForm {...{ postToBackend, error, isPending, isSuccess }} />
        </CardContent>
        <CardFooter>
          {(isPending || error) && (
            <div
              className={cn(
                'mx-auto w-1/2 rounded-lg p-3',
                isPending
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-destructive text-destructive-foreground'
              )}
            >
              {isPending ? (
                <div className='inline-flex w-full items-center justify-between truncate'>
                  <p className='font-light'>
                    Submitting client details...:&nbsp;
                    <span className='text-base font-medium'>{variables?.name}</span>
                  </p>
                  <Loader2 className='animate-spin' />
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  <p>Oh no! An error occurred.</p>
                  <div className='flex w-full flex-row justify-between'>
                    <Button
                      variant='outline'
                      className='border-secondary-foreground/30 bg-red-300 text-secondary-foreground ring-0 ring-offset-0'
                      onClick={() => resetMutationState()}
                    >
                      Cancel
                    </Button>
                    <Button variant='secondary' onClick={() => postToBackend(variables)}>
                      Retry request
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
