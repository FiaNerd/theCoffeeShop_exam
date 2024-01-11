import Button from "../components/partial/Button";

const CheckoutPage = () => {
  return (
    <div className="mx-auto p-5 max-w-[60em]">
    <div className="mx-4 p-4">

        <div className="flex items-center">
            <div className="flex items-center text-deep-brown relative">
                <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-white bg-deep-brown  border-deep-brown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bookmark ">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
            <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase font-bold text-deep-brown">Address</div>
         </div>

            <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-deep-brown"></div>
            <div className="flex items-center text-white relative">
                <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-deep-brown  border-deep-brown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user-plus ">
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
        
            <div className="flex flex-col md:flex-row">
                <div className="w-full mx-2 flex-1">
                    <div className="font-bold h-6 mt-3 text-deep-brown text-xs leading-8 uppercase">Förnamn</div>
                    <div className=" my-2 p-1 flex border border-deep-brown rounded ">
                        <input placeholder="Förnamn" className="w-full px-5 py-2 text-gray-700 bg-slate-200 rounded focus:outline-none focus:bg-slate-100" /> 
                    </div>
                </div>

                <div className="w-full mx-2 flex-1">
                    <div className="font-bold h-6 mt-3 text-deep-brown text-xs leading-8 uppercase">Efternamn</div>
                    <div className=" my-2 p-1 flex border border-deep-brown rounded ">
                        <input placeholder="Efternamn" className="w-full px-5 py-2 text-gray-700 bg-slate-200 rounded focus:outline-none focus:bg-slate-100" /> 
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row">
            <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-deep-brown text-xs leading-8 uppercase">Adress 1</div>
                    <div className=" my-2 p-1 flex border border-deep-brown rounded ">
                        <input placeholder="Address 1.." className="w-full px-5 py-2 text-gray-700 bg-slate-200 rounded focus:outline-none focus:bg-slate-100" /> 
                    </div>
                </div>
            </div>

            <div className="w-full mx-2 flex-1">
                    <div className="font-bold h-6 mt-3 text-deep-brown text-xs leading-8 uppercase">Address 2</div>
                    <div className=" my-2 p-1 flex border border-deep-brown rounded ">
                        <input placeholder="Adress 2.." className="w-full px-5 py-2 text-gray-700 bg-slate-200 rounded focus:outline-none focus:bg-slate-100" /> 
                    </div>
                </div>


                <div className="flex flex-col md:flex-row">
                <div className="w-full mx-2 flex-1">
                    <div className="font-bold h-6 mt-3 text-deep-brown text-xs leading-8 uppercase">Postkod</div>
                    <div className=" my-2 p-1 flex border border-deep-brown rounded ">
                        <input placeholder="Postkod" className="w-full px-5 py-2 text-gray-700 bg-slate-200 rounded focus:outline-none focus:bg-slate-100" /> 
                    </div>
                </div>

                <div className="w-full mx-2 flex-1 ">
                    <div className="font-bold h-6 mt-3 text-deep-brown text-xs leading-8 uppercase">Stad</div>
                    <div className=" my-2 p-1 flex border border-deep-brown rounded ">
                        <input placeholder="Stad" className="w-full px-5 py-2 text-gray-700 bg-slate-200 rounded focus:outline-none focus:bg-slate-100" /> 
                    </div>
                </div>
            </div>
    
        
        <div className="flex mt-4">
        <Button buttonType="load-more" typeAction="button" className="flex justify-center px-4 py-2  cursor-pointer duration-200 ease-in-out">Tillbaka</Button>
          

            <div className="flex-auto flex flex-row-reverse">
            <Button buttonType="create" typeAction="button" className="w-[20%] hover:scale-110 focus:outline-none flex justify-center px-4 py-2 cursor-pointer duration-200 ease-in-out">Nästa</Button>
            </div>
        </div>
    </div>
</div>
  )
}

export default CheckoutPage;