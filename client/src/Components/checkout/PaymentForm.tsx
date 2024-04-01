import { useFormContext } from "react-hook-form"
import InputForm from "../partial/forms/InputForm"

const PaymentForm = () => {
    const { control } = useFormContext()

    return (
    <>
        <h1 className="py-6 border-b-2 text-deep-brown px-8">Betalning</h1>
        <div className="mt-8 px-4">
            <div className="md:flex md:gap-4">
                <div className="md:w-1/2 mb-2 md:mb-0">
                    <InputForm
                    control={control}
                    label="Kortinehavare"
                    name="nameOnCard"
                    placeholder="Ditt namn"
                    />
                    <InputForm control={control} label="Kortnummer" name="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
                </div>

                <div className="md:w-1/2">
                    <InputForm control={control} label="Utgångstaum" name="expireDate" placeholder="24/5"/>
                    <InputForm control={control} label="CVV" name="cvc" placeholder="123" />

                </div>
            </div>
        </div>
    </>
    )
}

export default PaymentForm