import { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { useHistory, useParams } from 'react-router-dom';
import DefaultWrapper from '../../components/DefaultWrapper';
import useGetUser from '../../hooks/api/useGetUser';
import useUpdateUser from '../../hooks/api/useUpdateUser';
import useWindowSize from '../../hooks/useWindowSize';
import { initialUserValues } from '../../mocks';
import { User } from '../../models';
import UserForm from '../UserForm';

export default function UpdateUser() {
  const { id } = useParams<{ id: string }>();
  const { data: user } = useGetUser(id || '');
  const [initialValues, setInitialValues] = useState<User | undefined>(initialUserValues);
  const windowSize = useWindowSize();

  const history = useHistory();

  const { mutateAsync: updateUser, isLoading } = useUpdateUser(id);

  const handleSubmit = async (values: User) => {
    await updateUser(values);
    history.push('/users');
  };

  useEffect(() => {
    setInitialValues(user);
  }, [user]);

  return (
    <DefaultWrapper height={windowSize.height}>
      {isLoading ? (
        <Audio height='80' width='80' color='gray' ariaLabel='three-dots-loading' />
      ) : (
        <>{initialValues && <UserForm initialValues={initialValues} onSubmit={handleSubmit} />}</>
      )}
    </DefaultWrapper>
  );
}
