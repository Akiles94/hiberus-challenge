import { useField } from 'formik';
import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  position: relative;
`;

const StyledInput = styled.input`
  border-radius: 5px;
  border: 0.13em solid ${({ theme: { colors } }) => colors.secondary};
  padding: 5px 10px;
  ::placeholder {
    color: lightGray;
  }
`;

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${({ theme: { colors } }) => colors.secondary};
`;

type Props = ComponentPropsWithRef<'input'> & {
  label?: string;
  className?: string;
  as?: 'input' | 'textarea';
};
export default function Input({ label, className, ...props }: Props) {
  const [field] = useField(props.name || '');

  return (
    <StyledWrapper className={className}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput autoComplete={props.autoComplete || 'off'} {...field} {...props} />
    </StyledWrapper>
  );
}
