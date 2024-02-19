import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Label = styled.label``;

export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.25rem;
  width: 100%;
  height: 2.5rem;

  ::file-selector-button {
    font-weight: bold;
    padding: 0.5em;
    background: none;
    border: none;
  }
`;

export const ErrorMessage = styled.span`
  color: #ff6868;
`;
