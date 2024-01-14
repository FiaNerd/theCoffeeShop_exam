import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { clearBasket } from "../components/basket/basketSlice";
import AddressForm from "../components/checkout/AddressForm";
import OrderConfirmtation from "../components/checkout/OrderConfirmation";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentForm from "../components/checkout/PaymentForm";
import Button from "../components/partial/Button";
import StepCounter from "../components/partial/StepCounter";
import { useAppDispatch } from "../redux/configureStore";
import { orderValidationSchema } from "../schemas/OrderValidationSchema";
import { createOrder, getAddress } from "../services/CoffeeAPI";


const steps = ["Leverans adress", "Se din order", "Betalning"];

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0);
  const [ orderNumber, setOrderNumber ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(false)

  const dispatch = useAppDispatch()
  
  const currentValidationSchema = orderValidationSchema[activeStep]

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(currentValidationSchema)
  })


  useEffect(() => {
    const fetchAdress = async () => {
      try {
        const response = await getAddress();

        console.log("RESPONSE Check", response.data)
        
        if (response) {
          const test = methods.reset({ ...methods.getValues(), ...response, saveAddress: false });
          console.log("RESPONSE SAVED ADDRESS", response);
          console.log(test)
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
    fetchAdress();
  }, [methods]); 


  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <OrderSummary />;
      case 2:
        return <PaymentForm />;
      case 3:
        return <OrderConfirmtation  orderNr={orderNumber}/>;
      default:
        throw new Error("Unknown step");
    }
  };
  
  const handleBack = () => {
    if(activeStep === 0){
      navigate('/')
    }else{
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleNext = async (data: FieldValues) => {
  const { saveAddress, ...shippingAddress } = data;

  console.log("Saved", saveAddress)

  if (activeStep === steps.length - 1) {
    setIsLoading(true);

    try {
      const orderNumber = await createOrder({ saveAddress, shippingAddress });
      console.log('orderNumber', orderNumber);

      setOrderNumber(orderNumber);
      setActiveStep(activeStep + 1);
      dispatch(clearBasket());
    } catch (error) {
      console.error("ERROR with the order", error);
    } finally {
      setIsLoading(false);
    }
  } else {
    setActiveStep((prevStep) => prevStep + 1);
  }
};


  return (
    <>
      <FormProvider {...methods}>
        <div className="mx-auto max-w-[35em] mt-8">
          <StepCounter activeStep={activeStep} steps={steps} />
        </div>

        {activeStep === steps.length ? (
          <div className="mx-auto max-w-[35em] mt-16 mb-8">
            <OrderConfirmtation orderNr={orderNumber}/>
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
                    isLoading={isLoading}
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
