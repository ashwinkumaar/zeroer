import { ColumnDef } from '@tanstack/react-table';

type DataType = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
};

export const dataColumns: ColumnDef<DataType>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'name',
    header: 'name',
  },
  {
    accessorKey: 'address',
    header: 'address',
  },
  {
    accessorKey: 'city',
    header: 'city',
  },
  {
    accessorKey: 'phone',
    header: 'phone',
  },
];
