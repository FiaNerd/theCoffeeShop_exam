
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import AddressForm from "../components/checkout/AddressForm"
import OrderSummary from "../components/checkout/OrderSummary"
import PaymentForm from "../components/checkout/PaymentForm"

const step =['Leverans adress', 'Se din order', 'Betailnings detaljer']

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <AddressForm />
    case 1:
      return <OrderSummary />
    case 2:
      return <PaymentForm />
    default:
      throw new Error('Unknown step')
  }
}


const CheckoutPage = () => {
  const methods = useForm() 
  const [ activeStep, setActiveStep ] = useState(0)

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  } 

  return (
    <>
    <FormProvider {...methods}>
        {/* <AddressForm /> */}
        <OrderSummary />
      </FormProvider>
    </>
  )
}

export default CheckoutPage;