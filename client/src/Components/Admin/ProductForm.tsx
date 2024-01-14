import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useProducts from "../../hooks/useProducts";
import { Product } from "../../types/products";
import Buttons from "../partial/Button";
import InputForm from "../partial/InputForm";
import SelectProductList from "../partial/SelectProductList";

interface IProps {
  product?: Product;
  cancelEdit: () => void;
  title?: boolean;
}

const ProductForm = ({ product, cancelEdit, title }: IProps) => {
  const { control, reset } = useForm();
  const { types, roastLevels } = useProducts();

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  return (
    <div className="max-w-[600px] mx-auto">
      <h1 className="py-6 border-b-2 text-deep-brown px-8 uppercase">
        {title ? "Uppdatera produkt" : "Skapa produkt"}
      </h1>
      <div className="mt-8 px-4">
        <div className="w-full flex-1">
          <InputForm control={control} name="name" label="Produkt" />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-full flex-1">
            <SelectProductList control={control} name="type" label="Typ" items={types} />
          </div>

          <div className="w-full flex-1">
            <SelectProductList control={control} name="roastLevel" label="Rostnings grad" items={roastLevels} />
          </div>
        </div>

        <div className="w-full flex-1 mb-4">
          <InputForm multiline={true} rows={4} control={control} name="description" label="Beskrivning" />
        </div>

        <div className="w-full flex-1 mb-4">
          <InputForm control={control}  name="imageUrl" label="Produkt Bild" />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-full flex-1">
           <InputForm type="number" control={control} name="quantityInStock" label="Antal i lager" />
          </div>

          <div className="w-full flex-1">
             <InputForm type="number" control={control} name="price" label="Pris" />
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <Buttons buttonType={"cancel"} typeAction={"button"} className="px-8" onClick={cancelEdit}>
            Abryt
          </Buttons>
          <Buttons buttonType={"create"} typeAction={"button"} className="px-8">
            {title ? "Uppdatera" : "Lägg till"}
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
