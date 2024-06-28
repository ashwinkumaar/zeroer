import { Dispatch, SetStateAction } from 'react';

type ColumnFilterProps<T> = {
  id: string;
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
};

// export const ColumnFilter = <T,>({ }: ColumnFilterProps<T>) => {
//   return (
//     <div>
//       <Input
//     </div>
//   )
// }
