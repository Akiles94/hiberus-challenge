import { ComponentPropsWithoutRef, MouseEventHandler } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ theme: { colors } }) => colors.secondary};
  border-radius: 5px;
  border: 1px solid black;
  margin: 5px 0px;
  padding: 5px;
  cursor: pointer;
`;

type Props = ComponentPropsWithoutRef<'button'> & {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  className?: string;
};

export default function Button({ onClick, label, className }: Props) {
  return (
    <StyledButton className={className} onClick={onClick}>
      {label && label}
    </StyledButton>
  );
}
