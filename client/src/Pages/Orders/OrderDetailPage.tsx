import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../../services/CoffeeAPI";
import { Order } from "../../types/orders";
import { formatPrice } from "../../utils/formatPrice";

const OrderDetailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderItem, setOrderItem] = useState<Order | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchOrderData = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const fetchedOrder = await getOrder(Number(id));
          setOrderItem(fetchedOrder);
        } catch (error) {
          console.error("Error fetching order data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchOrderData();
  }, [id]);

  if (!orderItem) {
    return <p>Loading...</p>;
  }

  const subtotal =
    orderItem?.orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;

  const deliveryFee = subtotal > 25000 ? 0 : 2500;

  return (
    <>
      <div className="col-span-1 max-w-[35em] mx-auto mt-8">
        <h1 className="py-6 border-b-2 border-deep-brown text-deep-brown px-8 uppercase">
          Ditt order nr #{orderItem?.id}
        </h1>

        <ul className="grid grid-cols-4 gap-4 font-bold py-6 px-8 border-b border-deep-brown">
            <li>Products</li>
            <li>Namn</li>
            <li className=" text-right">Antal</li>
            <li className=" text-right">Pris</li>
        </ul>

        <ul className="py-6 border-b border-deep-brown space-y-6 px-8">
          {orderItem &&
            orderItem?.orderItems.map((item, index) => (
              <li key={index} className="grid grid-cols-6 gap-2">
                <div className="col-span-1 self-center">
                  <img src={item.imageUrl} alt="Product" className="rounded w-full" />
                </div>
                <div className="flex flex-col col-span-3 pt-2">
                  <span className="text-gray-600 ml-8 text-md font-semi-bold uppercase font-bold">{item.name}</span>
                </div>

                <div className="col-span-2 pt-3 text-end">
                  <div className="flex space-x-2 justify-between">
                    <p className="flex items-end text-gray-400">{item.quantity}</p>
                    <div className="flex flex-col gap-4">
                      <p className="text-deep-brown inline-block">{formatPrice(item.price)}</p>
                      <span className="text-md text-deep-brown font-semibold inline-block">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>

        <div className="px-8 border-b border-deep-brown">
          <div className="flex justify-between py-4 text-gray-600">
            <span className="text-gray-400">* Gratis frakt över 299kr</span>
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
};

export default OrderDetailPage;
