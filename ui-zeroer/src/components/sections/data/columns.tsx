import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table';

export const DATA_FIELDS = ['id', 'name', 'address', 'city', 'phone'] as const;

export type DataTypeKey = (typeof DATA_FIELDS)[number];

export type DataType = {
  [k in DataTypeKey]: string;
};

export const dataColumns: ColumnDef<DataType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='ID' />;
    },
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Name' />;
    },
    enableHiding: false,
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='size-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              Copy row ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>View row</DropdownMenuItem>
            <DropdownMenuItem disabled>View row details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
