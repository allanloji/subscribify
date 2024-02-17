import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const RecipientContainer = styled.div`
  display: flex;
  align-items: center;
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
  width: 500px;
  border-radius: 1rem;
  padding: 1.5rem;
  padding-top: 5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  position: relative;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const BackgroundContainer = styled.div<{
  background: { primary: string; secondary: string };
}>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 60px;
  border-radius: 1rem 1rem 0 0;
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
      background-size: 60px;
    `}
`;

export const FileContainer = styled.div`
  display: flex;
  align-items: center;
`;
