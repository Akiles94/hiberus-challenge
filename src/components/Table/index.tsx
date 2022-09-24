import * as React from 'react';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  padding: 2%;
`;

const StyledCell = styled.td`
  border: 1px solid lightgray;
  padding-left: 2%;
  padding-right: 2%;
`;

const StyledHeaderCell = styled.th`
  border: 1px solid lightgray;
  padding-left: 2%;
  padding-right: 2%;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Table({ tableData, columns }: { tableData: unknown[]; columns: any[] }) {
  const [data] = React.useState(() => [...tableData]);

  const rerender = React.useReducer(() => ({}), {})[1];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    rerender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  return (
    <StyledWrapper>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <StyledHeaderCell key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </StyledHeaderCell>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <StyledCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</StyledCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </StyledWrapper>
  );
}
