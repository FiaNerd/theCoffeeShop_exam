import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../partial/Button";
import InputForm from "../partial/InputForm";
import StepCounter from "../partial/StepCounter";


const AddressForm = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm()

  return (
      <form className="mx-auto p-5 max-w-[40em]" onSubmit={handleSubmit((data) => console.log(data)) }>
        <StepCounter />

        <div className="mt-8 p-4">
                <div className="w-full mx-2 flex-1">
                    <InputForm control={control} label="Förnamn" name="fullname" />
                </div>
          

            <div className="w-full mx-2 flex-1">                    
                <InputForm control={control} label="Adress 1" name="address1" />
            </div>

               <div className="w-full mx-2 flex-1">
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
    
                <div className="flex justify-between mt-8">
                <Button
                    buttonType='back'
                    typeAction='button'
                    iconType='arrow'
                    onClick={() => navigate(-1)}
                    className='mt-4 hover:text-orange'>
                    Tillbaka
                </Button> 
                <div className="gap-4">
                <Button buttonType={"create"} typeAction="submit" className="hover:scale-110 focus:outline-none px-6 py-4 cursor-pointer duration-200 ease-in-out">Nästa</Button>

                </div>

                </div>
    </div>
</form>
  )
}

export default AddressForm;