import { useAppSelector } from 'store/hooks';

const useCart = () => {
  const { items } = useAppSelector(s => s.cart);
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return { items, total };
};
export default useCart;
