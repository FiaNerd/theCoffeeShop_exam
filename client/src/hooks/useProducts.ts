import { useInfiniteQuery } from '@tanstack/react-query'
import * as CoffeeProducts from '../services/CoffeeAPI'

const useProducts = (type: string) => {
  return useInfiniteQuery({
    queryKey: ['products', type],
    queryFn: ({ pageParam = 1 }) =>
    CoffeeProducts.getProducts(pageParam, 12, type),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { metaData } = lastPage;

      console.log('Last page', lastPage);
      return metaData.currentPage < metaData.totalPages
        ? metaData.currentPage + 1
        : undefined;
    },
  });
};

export default useProducts
