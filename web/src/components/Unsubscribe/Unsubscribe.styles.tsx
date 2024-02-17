import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #666;
`;

export const Message = styled.p`
  color: #666;
`;
