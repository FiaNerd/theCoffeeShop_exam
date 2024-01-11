import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../partial/Button";
import InputForm from "../partial/InputForm";


const AddressForm = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm()

  return (
    <form className="mx-auto p-5 max-w-[40em]">
    <div className="mx-4 p-4">
        <div className="flex items-center">
            <div className="flex items-center text-deep-brown relative">
                <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-white bg-deep-brown  border-deep-brown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="feather feather-bookmark ">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
            <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-deep-brown">Address</div>
         </div>

            <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-deep-brown"></div>
            <div className="flex items-center text-white relative">
                <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-deep-brown  border-deep-brown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="feather feather-user-plus ">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-deep-brown">Order</div>
            </div>

            <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-deep-brown"></div>
            <div className="flex items-center text-deep-brown relative">
                <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-deep-brown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-mail ">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-deep-brown">Klar</div>
            </div>
        </div>
    </div>

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
                <Button buttonType={"create"} typeAction="button" className="hover:scale-110 focus:outline-none px-6 py-4 cursor-pointer duration-200 ease-in-out">Nästa</Button>

                </div>

                </div>

            
    </div>
</form>
  )
}

export default AddressForm;