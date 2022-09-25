import styled from 'styled-components';
import { useFormik, FormikProvider } from 'formik';
import { Audio } from 'react-loader-spinner';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useWindowSize from '../../hooks/useWindowSize';
import DefaultWrapper from '../../components/DefaultWrapper';
import StyledCard from '../../components/StyledCard';
import { LoginRequest, LoginResponse } from '../../dto';
import useLogin from '../../hooks/api/useLogin';
import { setToken } from '../../utils/authStore';
import { useHistory } from 'react-router-dom';
import { userValidator } from '../../validators/users';

const StyledImage = styled.img`
  width: 100px;
`;

const Login = () => {
  const windowSize = useWindowSize();
  const history = useHistory();
  const { mutateAsync: login, isLoading } = useLogin();
  const initialValues = {
    email: '',
    password: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: userValidator,
    onSubmit: async (values: typeof initialValues) => {
      const loginResponse: LoginResponse = await login(values as LoginRequest);
      await setToken(loginResponse.accessToken);
      history.replace('/users');
    },
  });
  return (
    <DefaultWrapper height={windowSize.height}>
      {isLoading ? (
        <Audio height='80' width='80' color='gray' ariaLabel='three-dots-loading' />
      ) : (
        <FormikProvider value={formik}>
          <StyledCard>
            <StyledImage src='./logo192.png' />
            <h1>Login</h1>
            <Input name='email' type='email' placeholder='Email' />
            <Input name='password' type='password' placeholder='Contraseña' />
            <Button type='submit' onClick={() => formik.submitForm()} label='Ingresar' />
            <Button onClick={() => history.push('signup')} label='Registrarme' />
          </StyledCard>
        </FormikProvider>
      )}
    </DefaultWrapper>
  );
};

export default Login;
