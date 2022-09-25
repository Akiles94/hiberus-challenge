import { Audio } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import DefaultWrapper from '../../components/DefaultWrapper';
import useGetUser from '../../hooks/api/useGetUser';
import useUpdateUser from '../../hooks/api/useUpdateUser';
import useWindowSize from '../../hooks/useWindowSize';
import { User } from '../../models';
import UserForm from '../UserForm';

export default function UpdateUser() {
  const { id } = useParams<{ id?: string }>();
  const { data: user } = useGetUser(id || '');
  const windowSize = useWindowSize();
  const initialValues = user;

  console.log(id);
  const { mutateAsync: updateUser, isLoading } = useUpdateUser(id || 0);

  const handleSubmit = async (values: User) => {
    await updateUser(values);
  };
  return (
    <DefaultWrapper height={windowSize.height}>
      {isLoading ? (
        <Audio height='80' width='80' color='gray' ariaLabel='three-dots-loading' />
      ) : (
        <UserForm initialValues={initialValues as unknown as User | undefined} onSubmit={handleSubmit} />
      )}
    </DefaultWrapper>
  );
}
