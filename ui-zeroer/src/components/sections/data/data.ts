import type { DataType } from "./columns";
import { useQuery } from '@tanstack/react-query'

export const useGetData = () => {
  const { data, error, isLoading } = useQuery<DataType[]>({
    queryKey: [],
    queryFn: async () => {
      return [{
        id: 'ABCD',
        name: 'A. Aardvark',
        'address': '1 Fusionopolis Way',
        city: 'Singapore',
        phone: '+65 12345678'
      }]
    }
  })
  return { data, error, isLoading }
}