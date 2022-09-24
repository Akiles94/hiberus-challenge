import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosRequestHeaders } from 'axios';
import api from '../../utils/httpClient';
import type { GetUsersResponse } from '../../dto';

export const GET_USERS = 'GET_USERS';

export const getUsers = async (headers?: AxiosRequestHeaders) => {
  const { data: users } = await api.get<GetUsersResponse>('/users', {
    headers: headers?.cookie ? { cookie: headers?.cookie } : undefined,
  });
  return users;
};

const useGetUsers = (options?: UseQueryOptions<GetUsersResponse, unknown, GetUsersResponse, typeof GET_USERS>) =>
  useQuery(GET_USERS, () => getUsers(), options);
export default useGetUsers;
