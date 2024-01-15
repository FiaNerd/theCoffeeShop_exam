import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useProducts from "../../hooks/useProducts";
import productValidationSchema from '../../schemas/productValidationSchema';
import { Product } from "../../types/products";
import Buttons from "../partial/Button";
import DropZoneProduct from "../partial/Forms/DropZoneProduct";
import InputForm from "../partial/Forms/InputForm";
import SelectProductList from "../partial/Forms/SelectProductList";

interface IProps {
  product?: Product;
  cancelEdit: () => void;
  title?: boolean;
}

const ProductForm = ({ product, cancelEdit, title }: IProps) => {
  const {
    control,
    reset,
    handleSubmit,
    watch,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(productValidationSchema),
  })
  const { types, roastLevels } = useProducts()
  const watchAllFields = watch()
  const watchFile = watchAllFields['file'] as { preview: string } | null

  console.log("WATCH", watchFile)
  useEffect(() => {
    if (product) {
      reset({
        ...product,
        roastLevel: [product.roastLevel], 
      });
    }
  }, [product, reset]);

  

  const handleSubmitImg= (data: FieldValues) => {
    console.log("DATA", data)
  }

  return (
    <div className="max-w-[600px] mx-auto mb-8">
      <h1 className="pb-6 border-b border-deep-brown text-deep-brown px-8 uppercase">
        {title ? "Uppdatera produkt" : "Skapa produkt"}
      </h1>
      <div className="mt-8 px-4">
        <form onSubmit={handleSubmit(handleSubmitImg)}>
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

        <div className="flex gap-4 mb-4">
          <div className="w-full flex-1">
           <InputForm type="number" control={control} name="quantityInStock" label="Antal i lager" />
          </div>

          <div className="w-full flex-1">
             <InputForm type="number" control={control} name="price" label="Pris" />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 mb-12">
  <DropZoneProduct control={control} name="file" />

  <div className="flex items-center justify-center">
    {watchFile ? (
      <img
        src={watchFile.preview}
        alt="preview"
        className="w-[13em] h-[8.3em] object-cover" 
      />
    ) : (
      <img
        src={product?.imageUrl}
        alt={product?.name}
        className="w-[13em] h-[8.3em] object-contain" 
      />
    )}
  </div>
</div>


        <div className="flex flex-row justify-between">
          <Buttons buttonType={"cancel"} typeAction={"button"} className="px-8" onClick={cancelEdit}>
            Abryt
          </Buttons>
          <Buttons buttonType={"create"} typeAction="submit" className="px-8">
            {title ? "Uppdatera" : "Lägg till"}
          </Buttons>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
