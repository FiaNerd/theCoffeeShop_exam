import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../components/partial/LoadingSpinner";
import { getOrders } from "../services/CoffeeAPI";
import { Orders } from "../types/orders";
import { currencyFormat } from "../utils/currencyFormat";

const OrderPage = () => {
    const [orders, setOrders] = useState<Orders | null>(null);
    const [ isLoading, setIsLoading ] = useState(true)

    console.log("Orders STATE", orders)

    useEffect(() => {
        setIsLoading(true);
        getOrders()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }, []);

    if(isLoading){
        return <LoadingSpinner />
    }
    
    return (
        <div className="flex flex-col max-w-[1000px] mx-auto m-8">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-deep-brown border-b">
                    <tr>
                      <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left uppercase">
                        # Order
                      </th>
                      <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left uppercase">
                        Totalt
                      </th>
                      <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left uppercase">
                        Order skapad
                      </th>
                      <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left uppercase">
                        Order status
                      </th>
                      <th scope="col" className="text-md font-bold text-white px-6 py-4 text-right uppercase">
                        {/* Se ordra */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order, index) => (
                      <tr
                        key={order.id}
                        className={`${
                          index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                        } items-center border-b border-deep-brown  text-left`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-deep-brown">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-deep-brown">{currencyFormat(order.total)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-deep-brown">{order.orderDate.split('T')[0]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-deep-brown">{order.orderStatus}</td>
                        <NavLink to="#" className="px-6 justify-end py-4 whitespace-nowrap text-sm font-bold underline underline-offset-4 text-deep-brown cursor-pointer hover:opacity-80 flex items-center">
                            <span className="my-auto">Se order</span>
                        </NavLink>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
};

export default OrderPage;