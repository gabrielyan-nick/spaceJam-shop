import { useAuth } from './useAuth';
import { useQuery } from '@tanstack/react-query';
import UserService from 'services/user.service';
import { IFullUser } from 'types/user.interface';

interface IProfile {
  profile: IFullUser;
  isLoading: boolean;
}

const useProfile = (): IProfile => {
  const { data, isLoading } = useQuery({
    queryKey: ['get profile'],
    queryFn: () => UserService.getProfile(),
    select: ({ data }) => data,
  });

  return { profile: data || ({} as IFullUser), isLoading };
};

export default useProfile;
