import { createColumnHelper } from '@tanstack/react-table';
import { Audio } from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import DefaultWrapper from '../../components/DefaultWrapper';
import StyledCard from '../../components/StyledCard';
import Table from '../../components/Table';
import useDeleteUser from '../../hooks/api/useDeleteUser';
import useGetUsers from '../../hooks/api/useGetUsers';
import { User } from '../../models';
import { deleteToken } from '../../utils/authStore';

const StyledButton = styled(Button)`
  align-self: flex-end;
  margin-right: 5%;
`;

const StyledAction = styled(Button)`
  margin: 5px;
`;

const StyledActions = styled.div`
  display: flex;
  gap: 5px;
`;

export default function Users() {
  const { data, isLoading, refetch } = useGetUsers();
  const history = useHistory();
  const { mutateAsync: deleteUser } = useDeleteUser();

  const columnHelper = createColumnHelper<User>();

  const handleDeleteUser = async (id: string | number) => {
    await deleteUser(id);
    await refetch();
  };

  const columns = [
    columnHelper.accessor(row => row.name, {
      id: 'name',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Nombres</span>,
    }),
    columnHelper.accessor(row => row.surname, {
      id: 'surname',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Apellidos</span>,
    }),
    columnHelper.accessor(row => row.email, {
      id: 'email',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor(row => row.id, {
      id: 'actions',
      cell: info => (
        <StyledActions>
          <StyledAction label='Editar' onClick={() => history.push({ pathname: `/updateUser/${info.getValue()}` })} />
          <StyledAction label='Eliminar' onClick={() => handleDeleteUser(info.getValue() || 0)} />
        </StyledActions>
      ),
      header: () => <span>Acciones</span>,
    }),
  ];

  const handleLogout = async () => {
    await deleteToken();
    history.replace('/login');
  };

  return (
    <DefaultWrapper>
      {isLoading ? (
        <Audio height='80' width='80' color='gray' ariaLabel='three-dots-loading' />
      ) : (
        <>
          <StyledButton label='Salir' onClick={handleLogout} />
          <StyledCard>
            <h1>Usuarios</h1>
            {data && <Table tableData={data.items} columns={columns} />}
          </StyledCard>
        </>
      )}
    </DefaultWrapper>
  );
}
