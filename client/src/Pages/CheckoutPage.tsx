import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AddressForm from "../components/checkout/AddressForm";
import OrderConfirmtation from "../components/checkout/OrderConfirmtation";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentForm from "../components/checkout/PaymentForm";
import Button from "../components/partial/Button";
import StepCounter from "../components/partial/StepCounter";

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
  const methods = useForm();
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      <FormProvider {...methods}>
    <form className="mx-auto max-w-[35em]"> 
      <StepCounter activeStep={activeStep} steps={steps} />
        {getStepContent(activeStep)}
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
                <Button buttonType={"create"} typeAction="submit" className="hover:scale-110 focus:outline-none px-6 py-4 cursor-pointer duration-200 ease-in-out">Gå vidare</Button>
                </div>
           </div>
    </form>
      </FormProvider>
    </>
  );
};

export default CheckoutPage;
