import { instance } from 'api/api.interceptor';
import { usersUrl } from 'config/url';
import { IUser, UserUpdateType } from 'types/user.interface';

const UserService = {
  async getProfile() {
    return instance.get<IUser>(usersUrl());
  },

  async updateProfile(data: UserUpdateType) {
    return instance.put<IUser>(usersUrl(), data);
  },

  async toggleFavorite(productId: string) {
    return instance.patch<IUser>(usersUrl(`favorites/${productId}`));
  },
};

export default UserService;
