import styled from 'styled-components';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Audio } from 'react-loader-spinner';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useWindowSize from '../../hooks/useWindowSize';
import DefaultWrapper from '../../components/DefaultWrapper';
import StyledCard from '../../components/StyledCard';
import { LoginRequest, LoginResponse } from '../../dto';
import useLogin from '../../hooks/api/useLogin';
import { setToken } from '../../utils/authStore';

const StyledImage = styled.img`
  width: 100px;
`;

type Props = {
  setSwitch: (param: boolean) => void;
};

const Login = ({ setSwitch }: Props) => {
  const windowSize = useWindowSize();
  const { mutateAsync: login, isLoading } = useLogin();
  const initialValues = {
    email: '',
    password: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email().required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values: typeof initialValues) => {
      const loginResponse: LoginResponse = await login(values as LoginRequest);
      await setToken(loginResponse.accessToken);
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
            <Button onClick={() => setSwitch(false)} label='Registrarme' />
          </StyledCard>
        </FormikProvider>
      )}
    </DefaultWrapper>
  );
};

export default Login;
