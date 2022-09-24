import { createColumnHelper } from '@tanstack/react-table';
import styled from 'styled-components';
import Button from '../../components/Button';
import DefaultWrapper from '../../components/DefaultWrapper';
import StyledCard from '../../components/StyledCard';
import Table from '../../components/Table';
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

const columnHelper = createColumnHelper<User>();

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
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <StyledActions>
        <StyledAction label='Ver' onClick={() => {}} />
        <StyledAction label='Editar' onClick={() => {}} />
        <StyledAction label='Eliminar' onClick={() => {}} />
      </StyledActions>
    ),
    header: () => <span>Acciones</span>,
  }),
];

export default function Users() {
  const { data } = useGetUsers();
  const users = data?.items;
  console.log(users);

  const handleLogout = async () => {
    await deleteToken();
  };

  return (
    <DefaultWrapper>
      <StyledButton label='Salir' onClick={handleLogout} />
      <StyledCard>
        <h1>Usuarios</h1>
        {users && <Table tableData={users || []} columns={columns} />}
      </StyledCard>
    </DefaultWrapper>
  );
}
