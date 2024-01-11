interface IProps {
    orderNr: number
}
const OrderConfirmation = ({ orderNr }: IProps) => {
    return (
        <div>
            <h1 className="py-6 border-b-2 border-deep-brown text-deep-brown px-8 uppercase">Orderbekräftelse</h1>
       
            <div className="px-8 mt-8 ">
                <h2>Tack för din order</h2>
                <h3 className="font-bold">Ditt ordernummer är <span className="">#{orderNr}</span></h3>
            </div>
            
                <p className="mb-6 py-6 border-b border-deep-brown text-deep-brown px-8">Vi har mailat din order comfimation, och vi vill uppdatera dig när ordern har skickats.</p>
                <h3 className="px-8 pb-2 pt-2  font-bold">Med vänliga häslningar,</h3>
                <h3 className="px-8 text-orange font-bold">Kaffebönans skafferi</h3>
       
        </div>
    );
};

export default OrderConfirmation;