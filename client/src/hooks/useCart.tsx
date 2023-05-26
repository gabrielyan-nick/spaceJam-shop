import { useAppSelector } from 'store/hooks';

const useCart = () => useAppSelector(s => s.cart);
export default useCart;
