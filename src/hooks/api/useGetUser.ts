import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosRequestHeaders } from 'axios';
import api from '../../utils/httpClient';
import { User } from '../../models';

export const GET_USER = 'GET_USER';

export const getUser = async (id: string, headers?: AxiosRequestHeaders) => {
  const { data: users } = await api.get<User>(`/users/${id}`, {
    headers: headers?.cookie ? { cookie: headers?.cookie } : undefined,
  });
  return users;
};

const useGetUser = (id: string, options?: UseQueryOptions<User, unknown, User, [typeof GET_USER, typeof id]>) =>
  useQuery([GET_USER, id], () => getUser(id), options);
export default useGetUser;
