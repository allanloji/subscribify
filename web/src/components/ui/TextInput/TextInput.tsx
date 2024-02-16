import { forwardRef } from "react";
import { Spacer } from "..";
import * as S from "./TextInput.styles";

interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

function TextInput(
  { label, name, placeholder, onChange, onBlur, error }: TextInputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <>
      {label ? (
        <>
          <S.Label htmlFor={name}>{label}</S.Label>
          <Spacer size={0.5} />
        </>
      ) : null}

      <S.Input
        ref={ref}
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error ? (
        <>
          <Spacer size={0.5} />
          <S.ErrorMessage>{error}</S.ErrorMessage>
        </>
      ) : null}
    </>
  );
}

export default forwardRef(TextInput);
