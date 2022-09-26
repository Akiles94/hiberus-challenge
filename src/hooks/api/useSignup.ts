import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { SignUpRequest } from '../../dto';
import api from '../../utils/httpClient';
import { GET_USERS } from './useGetUsers';

export const signup = async (body: SignUpRequest) => {
  const { data: logged } = await api.post<{}>('/auth/sign-up', body);
  return logged;
};

const useSignup = (options?: UseMutationOptions<{}, unknown, SignUpRequest>) => {
  const queryClient = useQueryClient();
  return useMutation(signup, {
    onSuccess: async () => {
      toast.success('Usuario creado');
      await queryClient.invalidateQueries([GET_USERS]);
    },
    ...options,
  });
};

export default useSignup;
