
const OrderSummary = () => {

    return (           
    <>
        <div className="col-span-1 ">
            <h1 className="py-6 border-b-2 text-deep-brown px-8 uppercase">Din order</h1>
            <ul className="py-6 border-b space-y-6 px-8">
                <li className="grid grid-cols-6 gap-2 border-b-1">
                    <div className="col-span-1 self-center">
                        <img src="/images/products/bryggkaffe/mork_rost/froza-1200x1200.jpg" alt="Product" className="rounded w-full" />
                    </div>
                    <div className="flex flex-col col-span-3 pt-2">
                        <span className="text-gray-600 text-md font-semi-bold uppercase font-bold">Froza</span>
                        <span className="text-gray-400 text-sm inline-block pt-2">Mörkrost</span>
                    </div>
                    <div className="col-span-2 pt-3">
                        <div className="flex items-center space-x-2 text-sm justify-between">
                            <span className="text-gray-400">2 </span>
                            <span className="text-deep-brownfont-semibold inline-block">61.98 kr</span>
                        </div>
                    </div>
                </li>
                <li className="grid grid-cols-6 gap-2 border-b-1">
                    <div className="col-span-1 self-center">
                        <img src="/images/products/bryggkaffe/mork_rost/estanzia_organic-1200x1200.jpg" alt="Product" className="rounded w-full" />
                    </div>
                    <div className="flex flex-col col-span-3 pt-2">
                        <span className="text-gray-600 text-md font-semi-bold uppercase font-bold">Estanzia organic</span>
                        <span className="text-gray-400 text-sm inline-block pt-2">Mörkrost</span>
                    </div>
                    <div className="col-span-2 pt-3">
                        <div className="flex items-center space-x-2 text-sm justify-between">
                            <span className="text-gray-400">1</span>
                            <span className="text-deep-brown font-semibold inline-block">785 kr</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="px-8 border-b">
                <div className="flex justify-between py-4 text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-deep-brown">846.98 kr</span>
                </div>
                <div className="flex justify-between py-4 text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-orange">Gratis frakt</span>
                </div>
            </div>
            <div className="font-semibold text-xl px-8 flex justify-between py-8 text-deep-brown">
                <span>Total</span>
                <span>846.98 kr</span>
            </div>
        </div>
    </>
    );
}

export default OrderSummary