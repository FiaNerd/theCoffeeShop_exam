import { useEffect } from "react";
import {
  fetchFilters,
  fetchProductsAsync
} from "../components/product/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";

const useProducts = () => {
    const dispatch = useAppDispatch();
    const productParams = useAppSelector((state) => state.product.productParams);
    const allCoffeeProducts  = useAppSelector((state) => state.product.allProducts);
    const {  productsLoaded, filtersLoaded, types, roastLevels, metaData } = useAppSelector((state) => state.product);
  
    console.log("METADAT hook", metaData)
    useEffect(() => {
      // Whenever productParams changes, dispatch the fetchProductsAsync thunk
      dispatch(fetchProductsAsync());
    }, [ dispatch, productParams ]);
  
    useEffect(() => {
      if (!productsLoaded) {
        dispatch(fetchProductsAsync());
      }
    }, [dispatch, productsLoaded]);
  
    useEffect(() => {
      if (!filtersLoaded) {
        dispatch(fetchFilters());
      }
    }, [ dispatch, filtersLoaded ]);

    return {
        allCoffeeProducts,
        productParams,
        productsLoaded, 
        filtersLoaded,
        types,
        roastLevels,
        metaData
    }
}

export default useProducts