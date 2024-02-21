import { forwardRef } from "react";
import { Spacer } from "..";
import * as S from "./FileInput.styles";

interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

function FileInput(
  { label, name, placeholder, onChange, onBlur, error }: TextInputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <Spacer size={0.5} />
      <S.Input
        type="file"
        accept="image/png,application/pdf"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
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

export default forwardRef(FileInput);
