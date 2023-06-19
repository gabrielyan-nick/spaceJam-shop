'use client';

import { Metadata, NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { StorageService } from 'services/storage.service';

export const metadata: Metadata = {
  title: 'SpaceJam',
  description: '',
};

const GoogleRedirectPage: NextPage = () => {
  const params = useSearchParams();

  useEffect(() => {
    const data: string = params.get('data') as string;
    StorageService.saveToStorage(JSON.parse(data));
    history.go(-2);
  }, []);

  return <></>;
};

export default GoogleRedirectPage;
