import { useAppSelector } from "../../redux/configureStore";
import { formatPrice } from "../../utils/formatPrice";

const OrderSummary = () => {
    const { basket  } = useAppSelector(state => state.basket)
  
    const subtotal =
      basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;
  
    const deliveryFee = subtotal > 25000 ? 0 : 2500

  
    return (           
    <>
        <div className="col-span-1 ">
            <h1 className="py-6 border-b-2 text-deep-brown px-8 uppercase">Din order</h1>
            <ul className="py-6 border-b space-y-6 px-8">
                { basket?.items.map(item => ( 
                <li className="grid grid-cols-6 gap-2 border-b-1">
                    <div className="col-span-1 self-center">
                        <img src={item.imageUrl} alt="Product" className="rounded w-full" />
                    </div>
                    <div className="flex flex-col col-span-3 pt-2">
                        <span className="text-gray-600 text-md font-semi-bold uppercase font-bold">{item.name}</span>
                        <span className="text-gray-400 text-sm inline-block pt-2">{item.type}</span>
                    </div>
                    <div className="col-span-2 pt-3 text-end">
                        <div className="flex space-x-2  justify-between">
                            <p className="flex items-end text-gray-400">{item.quantity}</p>
                            <div className="flex flex-col gap-4">
                            <p className="text-deep-brown  inline-block">{formatPrice(item.price)}</p>
                            <span className="text-md text-deep-brown font-semibold inline-block">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
            <div className="px-8 border-b">
                <div className="flex justify-between py-4 text-gray-600">
                    <span className="text-gray-400">* Gratis frak över 300kr</span>
                    <span className="font-semibold text-deep-brown">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between py-4 text-gray-600">
                    <span>Frakt</span>
                    <span className="font-semibold text-orange">{formatPrice(deliveryFee + deliveryFee)}</span>
                </div>
            </div>
            <div className="font-semibold text-xl px-8 flex justify-between py-8 text-deep-brown">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
            </div>
        </div>
    </>
    );
}

export default OrderSummary