import styled from "@emotion/styled";
import Link from "next/link";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1000px));
  gap: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const CreateLink = styled(Link)`
  background-color: #000;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 1rem;
  text-decoration: none;
  display: block;
  transition: color 0.2s;
  text-align: center;
  width: fit-content;

  &:hover {
    background-color: #666;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
