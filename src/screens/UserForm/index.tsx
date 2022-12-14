import { FormikProvider, useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import StyledCard from '../../components/StyledCard';
import { initialUserValues } from '../../mocks';
import { User } from '../../models';
import { userValidator } from '../../validators/users';

const StyledImage = styled.img`
  width: 100px;
`;

export default function UserForm({
  initialValues,
  onSubmit,
}: {
  initialValues?: User;
  onSubmit: (value: User) => void;
}) {
  const history = useHistory();
  const formik = useFormik({
    initialValues: initialValues
      ? {
          name: initialValues.name,
          surname: initialValues.surname,
          email: initialValues.email,
          password: '',
        }
      : initialUserValues,
    validationSchema: userValidator,
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <StyledCard>
        <StyledImage src='../logo192.png' />
        <h1>{initialValues?.id ? 'Editar Usuario' : 'Registro'}</h1>
        <Input name='name' placeholder='Nombres' />
        <Input name='surname' placeholder='Apellidos' />
        <Input name='email' type='email' placeholder='Email' />
        <Input name='password' type='password' placeholder='Contraseña' />
        <Button type='submit' onClick={() => formik.submitForm()} label={initialValues?.id ? 'Editar' : 'Enviar'} />
        <Button onClick={() => history.goBack()} label='Regresar' />
      </StyledCard>
    </FormikProvider>
  );
}
