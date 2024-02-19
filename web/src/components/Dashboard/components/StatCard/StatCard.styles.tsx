import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.75rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  width: 250px;
`;

export const IconContainer = styled.div<{ backgroundColor: string }>`
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 1rem;
  height: 60px;
  width: 60px;
  padding: 1rem;
`;

export const Title = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const Value = styled.p`
  color: #4f4f4f;
`;
