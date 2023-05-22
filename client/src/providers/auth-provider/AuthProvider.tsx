import { TypeComponentAuthFields } from './auth-page.types';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
import { StorageService } from 'services/storage.service';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { checkAuth, logout } = useActions();
  // const { pathname } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const accessToken = StorageService.getAccessToken();
    accessToken && checkAuth();
  }, []);

  useEffect(() => {
    const refreshToken = StorageService.getRefreshToken();
    if (!refreshToken && user) logout();
  }, [pathname]);

  return <>{children}</>;
};

// const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

// const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
//   Component: { isOnlyUser },
//   children,
// }) => {
//   const { user } = useAuth();
//   const { checkAuth, logout } = useActions();
//   const { pathname } = useRouter();

//   useEffect(() => {
//     const accessToken = StorageService.getAccessToken();
//     accessToken && checkAuth();
//   }, []);

//   useEffect(() => {
//     const refreshToken = StorageService.getRefreshToken();
//     if (!refreshToken && user) logout();
//   }, [pathname]);

//   return isOnlyUser ? (
//     <DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
//   ) : (
//     <>{children}</>
//   );
// };

export default AuthProvider;
