import { useFormContext } from "react-hook-form";
import CheckboxCheckout from "../partial/forms/CheckboxCheckout";
import InputForm from "../partial/forms/InputForm";


const AddressForm = () => {
    const { control } = useFormContext()

  return (
    <>
    <h1 className="py-6 border-b-2 text-deep-brown px-8">Leverans address</h1>
        <div className="mt-8 px-4">
            <div className="w-full flex-1">
                <InputForm control={control} name="fullName"  label="Förnamn" />
            </div>

            <div className="w-full flex-1 ">                    
                <InputForm control={control} name="address1"  label="Adress 1" />
            </div>
                
            <div className="w-full flex-1 ">
                    <InputForm control={control} name="address2"label="Adress 2" />
                </div>

                <div className="flex gap-4 mb-2">
                    <div className="w-full flex-1">
                        <InputForm control={control} name="zip" label="Postkod"  />
                    </div>

                    <div className="w-full flex-1 ">
                        <InputForm control={control} name="city"  label="Stad" />
                    </div>

                </div>
              
               <CheckboxCheckout 
                    disabled={false}
                    control={control} 
                    label="Spara address" 
                    name="saveAddress" 
                />

        </div>
    </>
  )
}

export default AddressForm;