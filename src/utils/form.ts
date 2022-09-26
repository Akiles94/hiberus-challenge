import { isArray, isString, values } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getError = (error?: string | string[] | object): any => {
  if (!error) return null;
  if (isString(error)) return error;
  if (isArray(error)) return getError(error.find(e => !!e));
  return getError(values(error).find(e => !!e));
};
