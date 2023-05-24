import { Home } from 'components';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Головна сторінка | SpaceJam',
  description: '',
};

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;
