import { useQuery } from '@tanstack/react-query';
import * as CoffeAPI from '../services/CoffeeAPI';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => CoffeAPI.getProducts()
    });
};