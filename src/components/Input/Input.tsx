import { useField } from 'formik';
import { ComponentPropsWithRef } from 'react';
import styled from 'styled-components';
import { getError } from '../../utils/form';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  position: relative;
`;

const StyledInput = styled.input<{ error?: string }>`
  border-radius: 5px;
  border: 0.13em solid ${({ theme: { colors }, error }) => (error ? colors.error : colors.secondary)};
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
  const [field, meta] = useField(props.name || '');
  const error = meta.touched ? getError(meta.error) : undefined;

  return (
    <StyledWrapper className={className}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput error={error} autoComplete={props.autoComplete || 'off'} {...field} {...props} />
    </StyledWrapper>
  );
}
