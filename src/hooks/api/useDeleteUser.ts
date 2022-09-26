import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import api from '../../utils/httpClient';
import { GET_USERS } from './useGetUsers';

export const deleteUser = async (userId: string | number) => {
  const { data: user } = await api.delete(`/users/${userId}`);
  return user;
};

const useDeleteUser = (options?: UseMutationOptions<string | number, unknown, unknown>) => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      toast.warning('Usuario eliminado');
      queryClient.invalidateQueries([GET_USERS]);
    },
    ...options,
  });
};

export default useDeleteUser;
