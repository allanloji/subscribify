import { forwardRef } from "react";
import { Spacer } from "..";
import * as S from "./DatetimeInput.styles";

interface DatetimeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

function DatetimeInput(
  { label, name, error, ...props }: DatetimeInputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <>
      {label ? (
        <>
          <label htmlFor={name}>{label}</label>
          <Spacer size={0.5} />
        </>
      ) : null}
      <S.Input
        type="datetime-local"
        ref={ref}
        id={name}
        name={name}
        {...props}
      />
    </>
  );
}

export default forwardRef(DatetimeInput);
