import { useContext } from 'react';
import { StoreContext } from '../context/storeContext';

export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw Error('Error - we are outside of the provider');
  }

  return context;
};
