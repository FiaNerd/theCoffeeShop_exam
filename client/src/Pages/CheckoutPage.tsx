import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AddressForm from "../components/checkout/AddressForm";
import OrderConfirmtation from "../components/checkout/OrderConfirmtation";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentForm from "../components/checkout/PaymentForm";
import Button from "../components/partial/Button";
import StepCounter from "../components/partial/StepCounter";
import { validationOrderSchema } from "../schemas/ValidationOrderSchema";


const steps = ["Leverans adress", "Se din order", "Betalning"];

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <OrderSummary />;
    case 2:
      return <PaymentForm />;
    case 3:
      return <OrderConfirmtation />;
    default:
      throw new Error("Unknown step");
  }
};

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0);
  // const activeSchema = activeStep === 0 ? addressSchema : paymentSchema;
  
  const currentValidationSchema = validationOrderSchema[activeStep]

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(currentValidationSchema),
  })

  
  const handleBack = () => {
    if(activeStep === 0){
      navigate('/')
    }else{
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleNext: SubmitHandler<Address> = async (data) => {
    if (activeStep === steps.length - 1) {
      console.log(data);
    }
    setActiveStep((prevStep) => prevStep + 1);
    console.log(data)
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className="mx-auto max-w-[35em] mt-8">
          <StepCounter activeStep={activeStep} steps={steps} />
        </div>

        {activeStep === steps.length ? (
          <div className="mx-auto max-w-[35em] mt-16 mb-8">
            <OrderConfirmtation />
          </div>
        ) : (
          <>
            <form className="mx-auto max-w-[35em] mt-16 mb-8" onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <div className="flex justify-between mt-8 mx-auto max-w-[35em]">
                <Button
                  buttonType="back"
                  typeAction="button"
                  iconType="arrow"
                  onClick={handleBack}
                  className="mt-4 hover:text-orange"
                >
                   {activeStep === 0  ? "Fortsätt shoppa" : "Tillbaka"}
                </Button>
                <div className="gap-4">
                  <Button
                    buttonType={"create"}
                    typeAction="submit"
                    className="hover:scale-110 focus:outline-none px-6 py-4 cursor-pointer duration-200 ease-in-out"
                  >
                    {activeStep === steps.length - 1 ? "Betala nu" : "Gå vidare"}
                  </Button>
                </div>
              </div>
            </form>
          </>
        )}
      </FormProvider>
    </>
  );
};

export default CheckoutPage;
