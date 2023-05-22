import { useAppSelector } from 'store/hooks';

export const useAuth = () => useAppSelector(s => s.user);
