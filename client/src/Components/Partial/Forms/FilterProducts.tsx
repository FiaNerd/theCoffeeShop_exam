import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/configureStore";
import { fetchFilters, fetchProductsAsync, setProductParams } from "../../product/productSlice";
import FilterCheckGroup from "./FilterCheckGroup";


const FilterProducts = () => {

  const { productsLoaded, filtersLoaded, types, roastLevels, productParams } = useAppSelector(state => state.product)
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
        {types &&(
          <FilterCheckGroup items={types} checked={productParams.types} onChange={(types: string[]) => dispatch(setProductParams({ types: types }))} />
        )}
      </div>

      <div className='main w-full md:max-w-[70%] flex-col md:flex-row mx-auto flex border rounded overflow-hidden m-4 select-none'>
        <div className='title py-3 my-auto px-5 bg-orange text-white text-sm font-semibold md:mr-3'>
          Rostning
        </div>
        {roastLevels &&
          roastLevels ? (
          <FilterCheckGroup items={roastLevels} checked={productParams.roastLevels} onChange={(roastLevels: string[]) => dispatch(setProductParams({ roastLevels: roastLevels }))} />
        ) : (
          <span>No roast levels available</span>
        )}
      </div>
    </>
  );
};

export default FilterProducts;

