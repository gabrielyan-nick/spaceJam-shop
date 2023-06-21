'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { StorageService } from 'services/storage.service';

const GoogleRedirect = () => {
  const params = useSearchParams();

  useEffect(() => {
    const data: string = params.get('data') as string;
    StorageService.saveToStorage(JSON.parse(data));
    history.go(-2);
  }, []);

  return <></>;
};

export default GoogleRedirect;
