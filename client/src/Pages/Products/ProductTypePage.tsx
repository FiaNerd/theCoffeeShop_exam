import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/partial/LoadingSpinner';
import Pagination from '../../components/partial/Pagination';
import CoffeeCard from '../../components/product/CoffeeCard';
import { setPageNumber } from '../../components/product/productSlice';
import useProducts from '../../hooks/useProducts';
import { useAppDispatch } from '../../redux/configureStore';

const ProductTypePage = () => {
  const { type } = useParams();
  const { allCoffeeProducts, metaData } = useProducts();
  const dispatch = useAppDispatch();

  
  if (allCoffeeProducts.length === 0) {
    return <LoadingSpinner />
  }

  const trimmedType = type ?? '';

  const filterProducts = () => {
    return allCoffeeProducts?.filter((products) => {
      const productTypes = products.type.map((productType) =>
        productType.toLowerCase().trim()
      );

      return productTypes.some((productType) =>
        trimmedType.toLowerCase().includes(productType)
      );
    });
  };

  const filteredProducts = allCoffeeProducts ? filterProducts() : [];

  if(!metaData){
    return null
  }

  // Calculate metaData for the filtered products to get right pagination
  const filteredMetaData = {
    pageSize: metaData?.pageSize,
    currentPage: metaData?.currentPage,
    totalCount: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / metaData?.pageSize),
  };

  return (
    <div className='px-4 container max-w-[1280px] mx-auto mb-4 mt-8'>
      <h1 className='text-dark-deep-brown mb-4 uppercase'>{type}</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown mb-8'>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <CoffeeCard key={product.id!} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {metaData && (
        <Pagination
          metaData={filteredMetaData}
          onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
        />
      )}
    </div>
  );
};

export default ProductTypePage;
