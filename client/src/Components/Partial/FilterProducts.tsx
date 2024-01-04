import { useEffect, } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import { fetchFilters, fetchProductsAsync } from "../product/productSlice";



const FilterProducts = () => {

  const { productsLoaded, filtersLoaded, types, roastLevels } = useAppSelector(state => state.product)
  const dispatch = useAppDispatch()

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

  return (
    <>
      <div className='main w-full md:max-w-[70%] flex-col md:flex-row mx-auto flex border rounded overflow-hidden m-4 select-none'>
        <div className='title py-3 my-auto px-5 bg-orange text-white text-sm font-semibold md:mr-3'>
          Typer
        </div>
        {types ? (
          types.map((type, index) => (
            <label key={index} className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
              <input
                  type='checkbox'
                  // onChange={() => handleFilterChange(type)}
                  // checked={selectFilter.includes(type)}
                />


              <div className='title px-2 my-auto'>{type}</div>
            </label>
          ))
        ) : (
          <span>No types available</span>
        )}
      </div>

      <div className='main w-full md:max-w-[70%] flex-col md:flex-row mx-auto flex border rounded overflow-hidden m-4 select-none'>
        <div className='title py-3 my-auto px-5 bg-orange text-white text-sm font-semibold md:mr-3'>
          Rostning
        </div>
        {roastLevels ? (
          roastLevels.map((roastLevel, index) => (
            <label key={index} className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
              <input
                type='checkbox'
                // onChange={() => handleFilterChange(roastLevel)}
                // checked={selectFilter.includes(roastLevel)}
              />

              <div className='title px-2 my-auto'>{roastLevel}</div>
            </label>
          ))
        ) : (
          <span>No roast levels available</span>
        )}
      </div>
    </>
  );
};

export default FilterProducts;

