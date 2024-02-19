import styled from "@emotion/styled";
import Link from "next/link";

export const RecipientContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

export const BackButton = styled(Link)`
  position: absolute;
  background-color: #000;
  color: #fff;
  border-radius: 2rem;
  border: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  width: 50px;
  height: 50px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }

  @media (max-width: 640px) {
    position: relative;
  }
`;
