import { getMetadata } from '@/utils/helper-server';
import Cart from './_components/cart-wrapper';

export const metadata = getMetadata({ title: 'Giỏ hàng | Gấu Lermao', path: '/gio-hang' });

const CartPage = () => {
  return <Cart />;
};

export default CartPage;
