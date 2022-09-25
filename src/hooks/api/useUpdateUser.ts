import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { User } from '../../models';
import api from '../../utils/httpClient';
import { GET_USERS } from './useGetUsers';

export const updateUser = async (userId: string | number, payload: User) => {
  const { data: user } = await api.put(`/seats/${userId}`, payload);
  return user;
};

const useUpdateUser = (userId: string | number, options?: UseMutationOptions<User, unknown, User>) => {
  const queryClient = useQueryClient();

  return useMutation(payload => updateUser(userId, payload), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([GET_USERS]);
    },
    ...options,
  });
};

export default useUpdateUser;
