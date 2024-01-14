import { useForm } from "react-hook-form";
import InputForm from "../partial/InputForm";

const ProductForm = () => {
  const { control } = useForm();

  return (
    <div className=" max-w-[800px] mx-auto">
    <h1 className="py-6 border-b-2 text-deep-brown px-8">Skapa produkt</h1>
        <div className="mt-8 px-4">
            <div className="w-full flex-1">
                <InputForm control={control} name="name"  label="Produkt" />
            </div>

            <div className="flex gap-4 mb-2">
            <div className="w-full flex-1 ">                    
                <InputForm control={control} name="type"  label="Typ" />
            </div>
                
            <div className="w-full flex-1 ">
                    <InputForm control={control} name="roastLevel"label="Rostnings grad" />
                </div>
            </div>

                <div className="flex gap-4 mb-2">
                    <div className="w-full flex-1">
                        <InputForm control={control} name="price" label="Pris"  />
                    </div>

                    <div className="w-full flex-1 ">
                        <InputForm control={control} name="quantityInStock"  label="Antal i lager" />
                    </div>
                    <div className="w-full flex-1 ">
                        <InputForm control={control} name="description"  label="Beskrivning" />
                    </div>
                    <div className="w-full flex-1 ">
                        <InputForm control={control} name="imageUrl"  label="Produkt Bild" />
                    </div>
                </div>
        </div>
    </div>
  );
};

export default ProductForm;
