import { useMutation, UseMutationOptions } from 'react-query';
import { SignUpRequest } from '../../dto';
import api from '../../utils/httpClient';

export const signup = async (body: SignUpRequest) => {
  const { data: logged } = await api.post<{}>('/auth/sign-up', body);
  return logged;
};

const useSignup = (options?: UseMutationOptions<{}, unknown, SignUpRequest>) => useMutation(signup, options);

export default useSignup;
