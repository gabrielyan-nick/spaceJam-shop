import MyOrders from './MyOrders';
import Footer from 'components/ui/Footer';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Мої замовлення | SpaceJam',
  description: '',
};

const MyOrdersPage: NextPage = () => {
  return (
    <>
      <main className="main">
        <MyOrders />
      </main>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
