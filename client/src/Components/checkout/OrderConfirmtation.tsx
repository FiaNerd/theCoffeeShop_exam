const OrderConfirmtation = () => {
    return (
        <div>
            <h1 className="py-6 border-b-2 text-deep-brown px-8 uppercase">Orderbekräftelse</h1>
       
            <div className="mt-8 px-4">
                <h2>Tack för din order</h2>
                <h3 className="font-bold">Ditt ordernummer är <span className="">#200167</span></h3>
                <p className="mb-8">Vi har mailat din order comfimation, och vi vill uppdatera dig när ordern har skickats.</p>
             <div className="border-b-2 mb-4"></div>
                <h3 className="font-bold">Med vänliga häslningar,</h3>
                <h3 className="fontbold">Kaffebönans skafferi</h3>
            </div>
       
        </div>
    );
};

export default OrderConfirmtation;