import GoogleRedirect from './GoogleRedirect';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'SpaceJam',
  description: '',
};

const GoogleRedirectPage: NextPage = () => {
  return <GoogleRedirect />;
};

export default GoogleRedirectPage;
