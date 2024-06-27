import type { DataType } from './columns';
import { useQuery } from '@tanstack/react-query';

export const useGetData = () => {
  const { data, error, isLoading, refetch } = useQuery<DataType[]>({
    queryKey: [],
    queryFn: async () => {
      // const response = await fetch(....)
      return [
        {
          id: 'ABCD',
          name: 'A. Aardvark',
          address: '1 Fusionopolis Way',
          city: 'Singapore',
          phone: '+65 12345678',
        },
        {
          id: 'DBCA',
          name: 'B. Bardvark',
          address: '2 Fusionopolis Way',
          city: 'Singapore',
          phone: '+65 87654321',
        },
      ];
    },
  });
  return { data, error, isLoading, refetch };
};
