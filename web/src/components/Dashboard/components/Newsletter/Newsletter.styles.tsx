import styled from "@emotion/styled";
import { getBackground } from "./utils";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 250px;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

  transition: transform 120ms ease-in-out;

  &:hover {
    transform: scale(1.02); // 1.1 is the scale factor, adjust as needed
  }
`;

export const TopImage = styled.div<{ id: string }>`
  height: 40%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  width: 100%;

  ${({ id }) => getBackground(id)}
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #000;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
`;
