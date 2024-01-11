import { useFormContext } from "react-hook-form";
import CheckboxCheckout from "../partial/CheckboxCheckout";
import InputForm from "../partial/InputForm";


const AddressForm = () => {
    const { control } = useFormContext()

  return (
    <>
    <h1 className="py-6 border-b-2 text-deep-brown px-8">Leverans address</h1>
        <div className="mt-8 px-4">
            <div className="w-full flex-1">
                <InputForm control={control} label="Förnamn" name="fullName" />
            </div>

            <div className="w-full flex-1 ">                    
                <InputForm control={control} label="Adress 1" name="address1" />
            </div>
                
            <div className="w-full flex-1 ">
                    <InputForm control={control} label="Adress 2" name="address2" />
                </div>

                <div className="flex gap-4 mb-2">
                    <div className="w-full flex-1">
                        <InputForm control={control} label="Postkod" name="zip" />
                    </div>

                    <div className="w-full flex-1 ">
                        <InputForm control={control} label="Stad" name="city" />
                    </div>

                </div>
              
               <CheckboxCheckout control={control} label="Spara adress" disabled={false} name="saveAddress" />

        </div>
    </>
  )
}

export default AddressForm;