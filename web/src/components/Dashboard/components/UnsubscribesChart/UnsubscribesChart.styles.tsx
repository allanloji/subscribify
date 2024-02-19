import styled from "@emotion/styled";

export const Container = styled.div`
  height: 400px;
  width: 100%;
  padding: 2rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  border-radius: 1rem;

  @media (max-width: 640px) {
    padding: 0 1rem 3rem 1rem;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
