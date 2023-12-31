import { useInfiniteQuery } from '@tanstack/react-query';
import * as CoffeeProducts from '../services/CoffeeAPI';


const useProducts = (pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 1 }) => CoffeeProducts.getProducts(pageParam, pageSize),
    initialPageParam: 1, 
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.pages.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};



// const useProducts = (page: number, pageSize: number) => {
//   return useQuery({
//     queryKey: ['products', page, pageSize],
//     queryFn: () => CoffeeProducts.getProducts(page, pageSize),
//   })
// }

export default useProducts
