import { useForm } from "react-hook-form";
import InputForm from "../partial/InputForm";


const AddressForm = () => {
    const { control, handleSubmit } = useForm()

  return (
      <form onSubmit={handleSubmit((data) => console.log(data)) }>
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
    
            {/* <div className="flex justify-between mt-8">
                <Button
                    buttonType='back'
                    typeAction='button'
                    iconType='arrow'
                    onClick={() => navigate(-1)}
                    className='mt-4 hover:text-orange'>
                    Tillbaka
                </Button> 
                <div className="gap-4">
                <Button buttonType={"create"} typeAction="submit" className="hover:scale-110 focus:outline-none px-6 py-4 cursor-pointer duration-200 ease-in-out">Gå vidare</Button>
                </div>
           </div> */}
    </div>
</form>
  )
}

export default AddressForm;