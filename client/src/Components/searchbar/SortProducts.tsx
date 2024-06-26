import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import SortButtonGroup from "../partial/SortButtonGroup";
import { setProductParams } from "../product/productSlice";
// import { setProductParamas } from "../product/productSlice";

 const sortOptions = [
  { value: 'name', label: 'Sortera: a - ö' },
  { value: 'price', label: 'Lägsta pris' },
  { value: 'priceDesc', label: 'Högsta pris' }
];

const SortProducts = () => {
  const { productParams  } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch()

  return (
    <div className='main gap-4 w-full md:max-w-[70%] flex-col md:flex-row mx-auto flex border rounded overflow-hidden m-4 select-none'>
      <div className='title py-3 my-auto px-5 bg-orange text-white text-sm font-semibold md:mr-3'>
        Sortera
      </div>
      <SortButtonGroup options={sortOptions} selectedValue={productParams.orderBy} onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))} />
    </div>
  )
}

export default SortProducts
