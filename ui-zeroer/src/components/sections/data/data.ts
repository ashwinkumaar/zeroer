import { useQuery } from '@tanstack/react-query';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { DATA_FIELDS, type DataTypeKey, type DataType } from './columns';

export const useGetData = () => {
  const [filterState, setFilterState] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    let dynParams: Record<string, string> = {};
    for (const key in params) {
      if (DATA_FIELDS.includes(key as DataTypeKey)) {
        dynParams = { ...dynParams, [key]: params.get(key)! };
      }
    }
    setFilterState(Object.entries(dynParams).map(([key, value]) => ({ id: key, value })));
  }, []);

  const { data, error, isLoading, refetch } = useQuery<DataType[]>({
    queryKey: [filterState],
    queryFn: async () => {
      // const response = await fetch(....)
      await new Promise((resolve, _reject) => {
        setTimeout(resolve, 30_000);
      });
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
  return { data, error, isLoading, refetch, filterFields: filterState };
};
