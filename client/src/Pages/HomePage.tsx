import { useEffect } from "react";
import Button from "../components/partial/Button";
import CoffeeCard from "../components/product/CoffeeCard";
import {
  fetchFilters,
  fetchProductsAsync
} from "../components/product/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const productParams = useAppSelector((state) => state.product.productParams);
  // const products = useAppSelector(productSelectors.selectAll);
  const allCoffeeProducts = useAppSelector((state) => state.product.allProducts);

  useEffect(() => {
    // Whenever productParams changes, dispatch the fetchProductsAsync thunk
    dispatch(fetchProductsAsync());
  }, [dispatch, productParams]);

  // console.log("PRODUCTS", products);
  const { productsLoaded, filtersLoaded } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFilters());
    }
  }, [dispatch, filtersLoaded]);

  console.log("PRODUCTS BEFORE THEY HOPE IN MAP", allCoffeeProducts);

  return (
    <div className="px-4 container max-w-[1280px] mx-auto mb-4 mt-8">
      <h1 className="text-dark-deep-brown mb-4 to uppercase">Vårt kaffe</h1>

      <div className="grid grid-cols-1 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown">
        {allCoffeeProducts &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          allCoffeeProducts.map((product: any) => (
            <CoffeeCard key={product.id} product={product} />
          ))}
      </div>

      <div className="flex mx-auto justify-center mb-8">
        <Button
          buttonType="load-more"
          typeAction={"button"}
          onClick={() => console.log("Click")}
        >
          Ladda fler
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
