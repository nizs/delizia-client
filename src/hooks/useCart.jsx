
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    // tan stack query usage 
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: cart = [], refetch } = useQuery({
        queryKey: ['cart', user?.email],  // unique for storing it;s data
        queryFn: async () => {     // for fetching the data
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
    });
    return [cart, refetch]
};

export default useCart;