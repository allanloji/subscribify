import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
}

const Spacer = styled.div<SpacerProps>`
  ${({ horizontal, size = 1 }) =>
    horizontal
      ? css`
          width: ${size}rem;
          display: inline-block;
        `
      : css`
          height: ${size}rem;
        `};
`;

export default Spacer;
