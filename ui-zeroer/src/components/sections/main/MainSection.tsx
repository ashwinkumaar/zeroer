import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AddUserForm } from './AddUserForm';
import { useMutation } from '@tanstack/react-query';
import { TFormData } from './schema';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

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
      const { id, name, address: addr, phone, city } = data;
      await new Promise((_resolve, _reject) => {
        setTimeout(() => _resolve('Test'), 1000);
      });
      return await fetch('API Endpoint,,,,', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          addr,
          phone,
          city,
        }),
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      // TODO: Toast success with link, delay navigate
      toast({
        variant: 'default',
        title: 'Add User Success',
        description: 'Success! Showing 5 nearest matches now',
        duration: 2500,
      });
      setTimeout(() => {
        window?.location?.assign(`/?view=data`);
      }, 3000);
    }
  }, [isSuccess]);

  return (
    <div className='flex flex-row gap-6'>
      <Card className='w-2/3 max-w-screen-md p-0'>
        <CardHeader className='px-6 pt-6'>
          <CardTitle className='mx-6'>Add a User to the Backend</CardTitle>
        </CardHeader>
        <CardContent className=''>
          <AddUserForm {...{ postToBackend, error, isPending, isSuccess }} />
        </CardContent>
        <CardFooter />
      </Card>
      <div className='grow pt-0 text-sm'>
        {(isPending || error) && (
          <div
            className={cn(
              'rounded-lg p-3',
              isPending
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-destructive text-destructive-foreground'
            )}
          >
            {isPending ? (
              <div className='inline-flex w-full items-center justify-between truncate'>
                <p className='font-light'>
                  Submitting user:&nbsp;
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
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
