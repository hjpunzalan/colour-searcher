import styled from 'styled-components';

export const Stack = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || 0};
`;

export const Row = styled.div<{ gap?: string }>`
  display: flex;
  align-items: stretch;
  gap: ${(props) => props.gap || 0};
`;
