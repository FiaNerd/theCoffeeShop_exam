// // // import { useInfiniteQuery } from "@tanstack/react-query";
// // // import { fetchProductsAsync } from "../components/product/productSlice";
// // // import { ProductParams } from "../types/products";

// // // const useFetchAllProducts = (productParams: ProductParams) => {
// // //     const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
// // //       ['products', productParams.types],
// // //       ({ pageParam = 1 }) => {
// // //         const params = {
// // //           ...productParams,
// // //           pageNumber: pageParam,
// // //         };
  
// // //         return fetchProductsAsync(params);
// // //       },
// // //       {
// // //         getNextPageParam: (lastPage) => {
// // //           const { metaData } = lastPage;
// // //           return metaData.currentPage < metaData.totalPages
// // //             ? metaData.currentPage + 1
// // //             : undefined;
// // //         },
// // //       }
// // //     );
// // //     return { data, fetchNextPage, hasNextPage, isFetching };
// // //   };
  
// // //   export default useFetchAllProducts


// // // import { useInfiniteQuery } from "@tanstack/react-query";
// // // import { fetchProductsAsync } from "../components/product/productSlice";
// // // import { ProductParams } from "../types/products";

// // // const useFetchAllProducts = (productParams: ProductParams) => {
// // //     const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({

// // //             queryKey: ['products', type],
// // //             queryFn: ({ pageParam = 1 }) =>
// // //             fetchProductsAsync(),
// // //             initialPageParam: 1,
// // //             getNextPageParam: (lastPage) => {

// // //                 const { metaData } = lastPage
        
// // //               console.log('Last page', lastPage);
// // //               return metaData.currentPage < metaData.totalPages
// // //                 ? metaData.currentPage + 1
// // //                 : undefined;
// // //             },
// // //         });
// // //     return { data, fetchNextPage, hasNextPage, isFetching };
// // //   };
  
// // //   export default useFetchAllProducts

// // // useFetchAllProducts.ts
// // import { useInfiniteQuery } from "@tanstack/react-query";
// // import { fetchProductsAsync } from "../components/product/productSlice";
// // import { PaginatedProducts, ProductParams } from "../types/products";

// // const useFetchAllProducts = (productParams: ProductParams) => {
// //   const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<PaginatedProducts>(
// //     ['products', productParams.types],
// //     ({ pageParam = 1 }) => {
// //       const params = {
// //         ...productParams,
// //         pageNumber: pageParam,
// //       };

// //       return fetchProductsAsync(params, { getState: () => ({ product: { productParams: params } }) });
// //     },
// //     {
// //       getNextPageParam: (lastPage) => {
// //         const { metaData } = lastPage;
// //         return metaData.currentPage < metaData.totalPages
// //           ? metaData.currentPage + 1
// //           : undefined;
// //       },
// //     }
// //   );

// //   return { data, fetchNextPage, hasNextPage, isFetching };
// // };

// // export default useFetchAllProducts;



// import { useInfiniteQuery } from '@tanstack/react-query';
// import { fetchProductsAsync } from '../components/product/productSlice';
// import { MetaData, ProductParams, Products } from '../types/products';

// type PaginatedResponse = {
//   items: Products;
//   metaData: MetaData;
// };

// const useFetchAllProducts = (productParams: ProductParams) => {
//     const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
//       ['products', productParams.types],
//       async ({ pageParam = 1 }: QueryFunctionContext) => {
//         // Use the pageParam and productParams to call fetchProductsAsync
//         return fetchProductsAsync({
//           ...productParams,
//           pageNumber: pageParam,
//         });
//       },
//       {
//         initialPageParam: 1,
//         getNextPageParam: (lastPage) => {
//           const { metaData } = lastPage;
//           return metaData.currentPage < metaData.totalPages
//             ? metaData.currentPage + 1
//             : undefined;
//         },
//       }
//   );

//   return { data, fetchNextPage, hasNextPage, isFetching };
// };

// export default useFetchAllProducts;
