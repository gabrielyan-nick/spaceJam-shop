'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { StorageService } from 'services/storage.service';

const GoogleRedirect = () => {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const data: string = params.get('data') as string;
    StorageService.saveToStorage(JSON.parse(data));
    router.push('/');
  }, []);

  return <></>;
};

export default GoogleRedirect;
