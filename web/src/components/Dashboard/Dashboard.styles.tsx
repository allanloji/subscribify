import styled from "@emotion/styled";
import Link from "next/link";

export const Title = styled.h1`
  font-size: 4rem;
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #666;
`;

export const CreateLink = styled(Link)`
  background-color: #000;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 1rem;
  text-decoration: none;
  margin-top: 2rem;
  display: block;
  transition: color 0.2s;
  text-align: center;
  width: fit-content;

  &:hover {
    background-color: #666;
  }
`;
