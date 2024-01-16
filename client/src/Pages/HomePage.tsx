import LoadingSpinner from "../components/partial/LoadingSpinner";
import Pagination from "../components/partial/Pagination";
import CoffeeCard from "../components/product/CoffeeCard";
import { setPageNumber } from "../components/product/productSlice";
import useProducts from "../hooks/useProducts";
import { useAppDispatch } from "../redux/configureStore";

const HomePage = () => {

  const { allCoffeeProducts, metaData } = useProducts()
  const dispatch = useAppDispatch()

  if(allCoffeeProducts.length === 0){
      return <LoadingSpinner />
  }

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

      { metaData && (
        <Pagination   metaData={metaData}
        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} />
      )}
    </div>
  );
};

export default HomePage;
