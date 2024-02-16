import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
}

const Spacer = styled.div<SpacerProps>`
  ${({ horizontal, size }) =>
    horizontal
      ? css`
          width: ${size}rem;
        `
      : css`
          height: ${size}rem;
        `};
`;

export default Spacer;
