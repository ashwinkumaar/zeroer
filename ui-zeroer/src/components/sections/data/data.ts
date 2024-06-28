import { useQuery } from '@tanstack/react-query';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { type DataType } from './columns';

export const useGetData = () => {
  const [filterState, setFilterState] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    params.delete('view');
    const dynParams: Record<string, string> = {};
    for (const key of ['id', 'name', 'address', 'phone', 'city']) {
      if (params.get(key)) {
        dynParams[key] = params.get(key)!;
      }
    }
    const nFS = Object.entries(dynParams).map((v) => ({ id: v[0], value: v[1] }));
    setFilterState(nFS);
  }, [window?.location]);

  const { data, error, isLoading, refetch } = useQuery<DataType[]>({
    queryKey: filterState,
    queryFn: async () => {
      const params = new URLSearchParams(
        Object.fromEntries(filterState.map((v) => [v.id, v.value as string]))
      );
      const endpoint = `http://127.0.0.1:5000/retrieve?${params}`;
      const { data } = await fetch(endpoint).then((res) => res.json());
      if (Array.isArray(data)) {
        return data;
      }
      return [data];
    },
    enabled: !!filterState,
  });
  return { data, error, isLoading, refetch, filterFields: filterState };
};
