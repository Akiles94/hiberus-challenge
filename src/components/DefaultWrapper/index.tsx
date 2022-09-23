import styled from 'styled-components';

const DefaultWrapper = styled.div<{ height: number }>`
  display: flex;
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: ${({ theme: { colors } }) => colors.primary};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10%;
`;

export default DefaultWrapper;
