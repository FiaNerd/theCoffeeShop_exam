// interface IProps {
//     steps: []
//     activeStep: number
// }

// const StepCounter = ({ activeStep, steps }: IProps) => {
//     return (
//         <>
//        <div className="mx-4 p-4 mb-8 mt-8">
//         <div className="flex items-center">
//             <div className="flex items-center text-deep-brown relative">
//                 <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-white bg-deep-brown  border-deep-brown">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="feather feather-bookmark ">
//                         <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
//                     </svg>
//                 </div>
//             <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-deep-brown">Address</div>
//          </div>

//             <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-deep-brown"></div>
//             <div className="flex items-center text-white relative">
//                 <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 text-deep-brown  border-deep-brown">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="feather feather-user-plus ">
//                         <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                         <circle cx="8.5" cy="7" r="4"></circle>
//                         <line x1="20" y1="8" x2="20" y2="14"></line>
//                         <line x1="23" y1="11" x2="17" y2="11"></line>
//                     </svg>
//                 </div>
//                 <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-deep-brown">Order</div>
//             </div>

//             <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-deep-brown"></div>
//             <div className="flex items-center text-deep-brown relative">
//                 <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-deep-brown">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-mail ">
//                         <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                         <polyline points="22,6 12,13 2,6"></polyline>
//                     </svg>
//                 </div>
//                 <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-deep-brown">Klar</div>
//             </div>
//         </div>
//     </div>


//         </>
//     );
// };

// export default StepCounter;



import React from "react";

interface IProps {
  steps: string[];
  activeStep: number;
}

const StepCounter: React.FC<IProps> = ({ activeStep, steps }: IProps) => {
  const getIconColor = (index: number): string => {
    return index === activeStep ? " rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-deep-brown text-white border-deep-brown" : "border-deep-brown text-deep-brown";
  };

  return (
    <div className=" mb-8 mt-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={`flex items-center ${getIconColor(index)} relative`}>
              <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-deep-brown">
          
                {index === 0 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="feather feather-mail">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                )}
                {index === 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="feather feather-user-plus">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                )}
                {index === 2 && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="feather feather-bookmark ">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-deep-brown">{step}</div>
            </div>
            {index < steps.length - 1 && <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-deep-brown"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepCounter;

