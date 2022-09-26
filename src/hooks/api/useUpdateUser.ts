import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { User } from '../../models';
import api from '../../utils/httpClient';
import { GET_USER } from './useGetUser';
import { GET_USERS } from './useGetUsers';

export const updateUser = async (userId: string | number, payload: User) => {
  const { data: user } = await api.put(`/users/${userId}`, payload);
  return user;
};

const useUpdateUser = (userId: string | number, options?: UseMutationOptions<User, unknown, User>) => {
  const queryClient = useQueryClient();

  return useMutation(payload => updateUser(userId, payload), {
    onSuccess: async () => {
      toast.success('Usuario actualizado');
      await queryClient.invalidateQueries([GET_USERS, GET_USER]);
    },
    ...options,
  });
};

export default useUpdateUser;
