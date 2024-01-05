import { useAppSelector, useAppDispatch } from "../../redux/configureStore";
import { setProductParamas } from "../product/productSlice";
import SortButtonGroup from "./SortButtonGroup";

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
      <SortButtonGroup options={sortOptions} selectedValue={productParams.orderBy} onChange={(e) => dispatch(setProductParamas({ orderBy: e.target.value }))} />
    </div>
  )
}

export default SortProducts
