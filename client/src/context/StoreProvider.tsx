// import { ReactNode, createContext, useContext, useState } from 'react';
// import { Basket, BasketItems } from '../types/Basket.types';
// import ShoppingCart from '../components/ShoppingCart';

// // Skapa ett context
// export const StoreContext = createContext<StoreContextType | undefined>(undefined);

// // Skapa ett gränssnitt för context-värden
// interface StoreContextType {
//   cartQuantity: number;
//   cartItem: Basket | null;
//   setCartItem: (updatedFields: Partial<Basket>) => void;
//   openCart: () => void;
//   closeCart: () => void;
//   getItemQuantity: (id: string) => number;
//   increaseCartQuantity: (id: string) => void;
//   decreaseCartQuantity: (id: string) => void;
//   removeFromCart: (id: string) => void;
//   calculateCartTotal: () => number;
// }

// interface ShoppingCartProviderProps {
//   children: ReactNode;
// }

// export const StoreProvider = ({ children }: ShoppingCartProviderProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [cartItem, setCartItemState] = useState<Basket | null>({
//     basketId: '',
//     buyerId: '',
//     items: [],
//   });

//   const cartItems = cartItem?.items || [];

//   const cartQuantity = cartItems.reduce(
//     (quantity, item) => item.quantity + quantity,
//     0
//   );

//   const openCart = () => setIsOpen(true);
//   const closeCart = () => setIsOpen(false);

//   const getItemQuantity = (id: string) =>
//     cartItems.find((item) => item.productId === id)?.quantity || 0;

//   const increaseCartQuantity = (id: string) => {
//     setCartItemState((prevCart: Basket | null) => {
//       if (!prevCart) return prevCart;

//       const existingItem = prevCart.items.find(
//         (item) => item.productId === id
//       );

//       if (!existingItem) {
//         return {
//           ...prevCart,
//           items: [...prevCart.items, { productId: id, quantity: 1 }],
//         } as Basket;
//       } else {
//         const updatedItems = prevCart.items.map((item) =>
//           item.productId === id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ) as BasketItems[];

//         return { ...prevCart, items: updatedItems } as Basket;
//       }
//     });
//   };

//   const decreaseCartQuantity = (id: string) => {
//     setCartItemState((prevCart) => {
//       if (!prevCart) return prevCart;

//       const existingItem = prevCart.items.find(
//         (item) => item.productId === id
//       );

//       if (!existingItem) return prevCart;

//       if (existingItem.quantity === 1) {
//         const updatedItems = prevCart.items.filter(
//           (item) => item.productId !== id
//         );
//         return { ...prevCart, items: updatedItems };
//       } else {
//         const updatedItems = prevCart.items.map((item) =>
//           item.productId === id
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         );

//         return { ...prevCart, items: updatedItems };
//       }
//     });
//   };

//   const removeFromCart = (id: string) => {
//     setCartItemState((prevCart) => {
//       if (!prevCart) return prevCart;
//       const updatedItems = prevCart.items.filter(
//         (item) => item.productId !== id
//       );
//       return { ...prevCart, items: updatedItems };
//     });
//   };

//   const calculateCartTotal = () =>
//     cartItems.reduce(
//       (total, item) => total + item.quantity * item.price,
//       0
//     );

//   const setCartItem = (updatedFields: Partial<Basket>) => {
//     setCartItemState((prevBasket: Basket | null) => {
//       if (!prevBasket) return prevBasket;
//       return { ...prevBasket, ...updatedFields };
//     });
//   };

//   // Skapa ett värdeobjekt för context
//   const contextValue: StoreContextType = {
//     cartQuantity,
//     cartItem,
//     setCartItem,
//     openCart,
//     closeCart,
//     getItemQuantity,
//     increaseCartQuantity,
//     decreaseCartQuantity,
//     removeFromCart,
//     calculateCartTotal,
//   };

//   // Returnera provider med barnkomponenter och värdeobjektet
//   return (
//     <StoreContext.Provider value={contextValue}>
//       {children}
//       {isOpen && <ShoppingCart />}
//     </StoreContext.Provider>
//   );
// };

// // Använd en egen hook för att konsumera context
// export const useStore = () => {
//   const context = useContext(StoreContext);
//   if (!context) {
//     throw new Error('useStore must be used within a StoreProvider');
//   }
//   return context;
// };





// import { ReactNode, createContext, useContext, useState } from 'react';
// import { Basket, } from '../types/Basket.types';


// interface StoreContextValue {
//   basket: Basket
//   setBasket: (basket: Basket) => void
//   removeItemFromCart: (productId: string, quantity: number) => void
// }

// const initialBasket: Basket = { buyerId: '', basketId: '', items: [] }

// export const StoreContext = createContext<StoreContextValue | undefined>(
//   undefined
// )

// interface StoreProviderProps {
//   children: ReactNode
// }

// export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
//   const [basket, setBasket] = useState<Basket>(initialBasket)

//   function removeItemFromCart(productId: string, quantity: number) {
//     if (!basket) return

//     const updatedBasket = [...basket.items]

//     const itemIndex = updatedBasket.findIndex((i) => i.productId === productId)
//     if (itemIndex >= 0) {
//       updatedBasket[itemIndex].quantity -= quantity

//       if (updatedBasket[itemIndex].quantity === 0)
//         updatedBasket.splice(itemIndex, 1)
//       setBasket((prevState) => {
//         return { ...prevState, items: updatedBasket }
//       })
//     }
//   }

//   const storeContextValue: StoreContextValue = {
//     basket,
//     setBasket,
//     removeItemFromCart,
//   }

//   return (
//     <StoreContext.Provider value={storeContextValue}>
//       {children}
//     </StoreContext.Provider>
//   )
// }

// export const useShoppingCart = () => {
//   const context = useContext(StoreContext)

//   if (!context) {
//     throw new Error('useShoppingCart must be used within a StoreProvider')
//   }

//   return context
// }




import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { Basket } from '../types/Basket.types'


interface StoreContextValue {
  removeItem: (productId: string, quantity: number) => void
  setBasket: (basket: Basket) => void
  basket: Basket | null
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
)

// eslint-disable-next-line react-refresh/only-export-components
export const useStoreContext = () => {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw Error('Oops - we do not seem to be inside the provider')
  }

  return context
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StoreProvider = ({ children }: PropsWithChildren<any>) => {
  const [basket, setBasket] = useState<Basket | null>(null)

  const removeItem = (productId: string, quantity: number) => {
    if (!basket) return

    const items = [...basket.items] 

    const itemIndex = items.findIndex((i) => i.productId === productId)
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1)
      setBasket((prevState) => {
        return { ...prevState!, items }
      })
    }
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  )
}












// import { ReactNode, useState } from 'react';
// import { Basket } from '../types/Basket.types';
// import { StoreContext } from './StoreContext';

// type BasketProviderProps = {
//   children: ReactNode;
// };

// export const StoreProvider = ({ children }: BasketProviderProps) => {
//   const [basket, setBasket] = useState<Basket>({ buyerId: "", basketId: "", items: [] });

//   function removeItemFromCart(productId: string, quantity: number) {
//     if (!basket) return;

//     const updatedBasket = [...basket.items];

//     const itemIndex = updatedBasket.findIndex((i) => i.productId === productId);
//     if (itemIndex >= 0) {
//       updatedBasket[itemIndex].quantity -= quantity;

//       if (updatedBasket[itemIndex].quantity === 0)
//         updatedBasket.splice(itemIndex, 1);
//       setBasket((prevState) => {
//         return { ...prevState, items: updatedBasket };
//       });
//     }
//   }

//   return (
//     <StoreContext.Provider value={{ basket, setBasket, removeItemFromCart }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };
