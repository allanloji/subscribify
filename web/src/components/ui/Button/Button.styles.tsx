import styled from "@emotion/styled";

export const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 2rem;
  border: none;
  font-size: 1rem;
  text-decoration: none;
  display: block;
  transition: color 0.2s;
  text-align: center;
  width: fit-content;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;
