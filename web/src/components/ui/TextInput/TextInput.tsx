import { forwardRef } from "react";
import { Spacer } from "..";
import * as S from "./TextInput.styles";

interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref: React.Ref<HTMLInputElement>;
}

function TextInput({
  label,
  name,
  placeholder,
  onChange,
  onBlur,
  ref,
}: TextInputProps) {
  return (
    <>
      {label ? <S.Label htmlFor={name}>{label}</S.Label> : null}
      <Spacer size={0.5} />
      <S.Input
        type="text"
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </>
  );
}

export default forwardRef(TextInput);
