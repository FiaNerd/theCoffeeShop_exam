import { useForm } from "react-hook-form";
import InputForm from "../partial/InputForm";


const AddressForm = () => {
    const { control, handleSubmit } = useForm()

  return (
    <>
        <h1 className="py-6 border-b-2 text-deep-brown px-8">Leverans address</h1>
            <div className="mt-8 px-4">
                <div className="w-full flex-1">
                    <InputForm control={control} label="Förnamn" name="fullname" />
                </div>
          

        <div className="w-full flex-1">                    
            <InputForm control={control} label="Adress 1" name="address1" />
        </div>
               <div className="w-full flex-1">
                    <InputForm control={control} label="Adress 2" name="address2" />
                </div>

                <div className="flex gap-4">
                    <div className="w-full flex-1">
                        <InputForm control={control} label="Postkod" name="Zip" />
                    </div>

                    <div className="w-full flex-1 ">
                        <InputForm control={control} label="Stad" name="city" />
                </div>
        </div>

    </div>
    </>
  )
}

export default AddressForm;