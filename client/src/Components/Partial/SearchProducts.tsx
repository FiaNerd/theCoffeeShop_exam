import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/configureStore";
import { setProductParamas } from "../product/productSlice";
import Button from "./Button";

interface IProps {
  onCloseSearch: () => void
  onCloseEnterSearch: () => void
}

const SearchProducts = ({ onCloseSearch, onCloseEnterSearch }: IProps) => {
  const { productParams } = useAppSelector(state => state.product)
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setProductParamas({ searchTerm: event.target.value}))
      setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
        event.preventDefault()
        setSearchTerm(""); 
        onCloseEnterSearch()
    }
  };

    const onClickSeacrh = () => {
        setSearchTerm(""); 
        onCloseSearch()
    };


  return (
    <div className="w-full md:max-w-[70%] flex items-center mx-auto mb-8">
      <input
        type="text"
        placeholder="Hitta ditt kaffe..."
        className="flex-1 py-3 px-3 border rounded focus:outline-none focus:ring focus:border-orange"
        value={searchTerm || ""}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
      {/* <Button buttonType="search" typeAction="button" onClick={}>
        Sök nu
      </Button> */}
      <Button buttonType="search" typeAction="button" onClick={onClickSeacrh}>
        Sök nu
      </Button>
    </div>
  );
};

export default SearchProducts;
