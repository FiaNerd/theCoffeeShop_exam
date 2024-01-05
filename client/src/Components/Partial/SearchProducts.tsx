import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useAppDispatch } from "../../redux/configureStore";
import { setProductParamas } from "../product/productSlice";
import Button from "./Button";

const SearchProducts = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(setProductParamas({ searchTerm }));
      setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
        event.preventDefault()
        setSearchTerm(""); 
    }
  };

  const onClickSeacrh = () => {
    dispatch(setProductParamas({ searchTerm }));
    setSearchTerm(""); 
  };


  return (
    <div className="w-full md:max-w-[70%] flex items-center mx-auto mb-8">
      <input
        type="text"
        placeholder="Hitta ditt kaffe..."
        className="flex-1 py-3 px-3 border rounded focus:outline-none focus:ring focus:border-orange"
        value={searchTerm}
        onChange={(event) => handleSearch(event)}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <Button buttonType="search" typeAction="button" onClick={onClickSeacrh}>
        Sök nu
      </Button>
    </div>
  );
};

export default SearchProducts;
