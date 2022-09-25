import { useParams } from 'react-router-dom';
import useGetUser from '../../hooks/api/useGetUser';
import useUpdateUser from '../../hooks/api/useUpdateUser';
import { User } from '../../models';
import UserForm from '../UserForm';

export default function UpdateUser() {
  const { id } = useParams<{ id?: string }>();
  const user = useGetUser(id || '');
  const initialValues = user;
  const { mutateAsync: updateUser } = useUpdateUser(id || 0);

  const handleSubmit = async (values: User) => {
    await updateUser(values);
  };
  return <UserForm initialValues={initialValues as unknown as User | undefined} onSubmit={handleSubmit} />;
}
