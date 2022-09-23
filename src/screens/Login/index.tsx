import styled from 'styled-components';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useWindowSize from '../../hooks/useWindowSize';

const StyledWrapper = styled.div<{ height: number }>`
  display: flex;
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: ${({ theme: { colors } }) => colors.primary};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10%;
`;

const StyledImage = styled.img`
  width: 100px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10%;
  padding: 10% 5%;
  box-shadow: 5px 5px 10px;
`;

const Login = () => {
  const windowSize = useWindowSize();
  const initialValues = {
    username: '',
    password: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values: typeof initialValues) => {
      console.log(values);
    },
  });
  return (
    <StyledWrapper height={windowSize.height}>
      <FormikProvider value={formik}>
        <StyledContainer>
          <StyledImage src='./logo192.png' />
          <h1>Login</h1>
          <Input name='username' type='username' placeholder='Usuario' />
          <Input name='password' type='password' placeholder='Password' />
          <Button type='submit' onClick={() => formik.submitForm()} label='Ingresar' />
        </StyledContainer>
      </FormikProvider>
    </StyledWrapper>
  );
};

export default Login;
