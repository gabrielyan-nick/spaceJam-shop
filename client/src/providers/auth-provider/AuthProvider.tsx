'use client';

import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
import { StorageService } from 'services/storage.service';

export const protectedRoutes = ['/my-orders', '/favorites'];

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { checkAuth, logout } = useActions();
  const router = useRouter();
  const pathname = usePathname();
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route),
  );

  useEffect(() => {
    const accessToken = StorageService.getAccessToken();
    accessToken && checkAuth();
  }, []);

  useEffect(() => {
    const refreshToken = StorageService.getRefreshToken();
    if (!refreshToken && user) logout();
  }, [pathname]);

  useEffect(() => {
    if (isProtectedRoute && !user) pathname !== '/' && router.replace('/');
  }, [pathname]);

  if (!isProtectedRoute || (user && isProtectedRoute)) return <>{children}</>;

  return null;
};

export default AuthProvider;
