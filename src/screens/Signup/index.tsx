import DefaultWrapper from '../../components/DefaultWrapper';
import useWindowSize from '../../hooks/useWindowSize';
import useSignup from '../../hooks/api/useSignup';
import { Audio } from 'react-loader-spinner';
import UserForm from '../UserForm';
import { User } from '../../models';

export default function SignUp() {
  const windowSize = useWindowSize();
  const { mutateAsync: signup, isLoading } = useSignup();
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  const handleSubmit = async (values: User) => {
    await signup(values);
  };
  return (
    <DefaultWrapper height={windowSize.height}>
      {isLoading ? (
        <Audio height='80' width='80' color='gray' ariaLabel='three-dots-loading' />
      ) : (
        <UserForm initialValues={initialValues} onSubmit={handleSubmit} />
      )}
    </DefaultWrapper>
  );
}
