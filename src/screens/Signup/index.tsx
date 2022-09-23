import { FormikProvider, useFormik } from 'formik';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import DefaultWrapper from '../../components/DefaultWrapper';
import StyledCard from '../../components/StyledCard';
import useWindowSize from '../../hooks/useWindowSize';
import * as Yup from 'yup';
import useSignup from '../../hooks/api/useSignup';
import { SignUpRequest } from '../../dto';
import { Audio } from 'react-loader-spinner';

const StyledImage = styled.img`
  width: 100px;
`;

type Props = {
  setSwitch: (param: boolean) => void;
};

export default function SignUp({ setSwitch }: Props) {
  const windowSize = useWindowSize();
  const { mutateAsync: signup, isLoading } = useSignup();
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required(),
      surname: Yup.string().required(),
      email: Yup.string().email().required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values: typeof initialValues) => {
      const signupResponse = await signup(values as SignUpRequest);
      console.log(signupResponse);
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
            <h1>Registro</h1>
            <Input name='name' placeholder='Nombres' />
            <Input name='surname' placeholder='Apellidos' />
            <Input name='email' type='email' placeholder='Email' />
            <Input name='password' type='password' placeholder='Contraseña' />
            <Button type='submit' onClick={() => formik.submitForm()} label='Enviar' />
            <Button onClick={() => setSwitch(true)} label='Regresar' />
          </StyledCard>
        </FormikProvider>
      )}
    </DefaultWrapper>
  );
}
