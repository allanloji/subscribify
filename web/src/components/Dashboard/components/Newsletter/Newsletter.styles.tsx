import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Container = styled.div<{
  background: { primary: string; secondary: string };
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 250px;
  border-radius: 1rem;
  padding: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  transition: transform 120ms ease-in-out;
  position: relative;
  ${({ background }) =>
    css`
      background: linear-gradient(
          135deg,
          ${background.primary} 21px,
          ${background.secondary} 22px,
          ${background.secondary} 24px,
          transparent 24px,
          transparent 67px,
          ${background.secondary} 67px,
          ${background.secondary} 69px,
          transparent 69px
        ),
        linear-gradient(
            225deg,
            ${background.primary} 21px,
            ${background.secondary} 22px,
            ${background.secondary} 24px,
            transparent 24px,
            transparent 67px,
            ${background.secondary} 67px,
            ${background.secondary} 69px,
            transparent 69px
          )
          0 64px;
      background-color: ${background.primary};
      background-size: 64px 128px;
    `}
`;

export const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #000;
`;

export const CommandOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 0.5rem;
`;

export const RecipientsContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #000;
`;

export const ButtonContainer = styled.button`
  background-color: transparent;
  text-decoration: none;
  display: block;
  text-align: center;
  width: fit-content;
  border: none;
  cursor: pointer;
`;
