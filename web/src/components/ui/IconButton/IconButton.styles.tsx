import styled from "@emotion/styled";

export const Button = styled.button`
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  border: none;
  text-decoration: none;
  display: inline-block;
  transition: color 0.2s;
  text-align: center;
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;
