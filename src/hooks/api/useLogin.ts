import { useMutation, UseMutationOptions } from 'react-query';
import { LoginRequest, LoginResponse } from '../../dto';
import api from '../../utils/httpClient';

export const login = async (body: LoginRequest) => {
  const { data: logged } = await api.post<LoginResponse>('/auth/log-in', body);
  return logged;
};

const useLogin = (options?: UseMutationOptions<LoginResponse, unknown, LoginRequest>) => useMutation(login, options);

export default useLogin;
