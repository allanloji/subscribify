import * as S from "./Button.styles";

function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <S.Button {...props}>{children}</S.Button>;
}

export default Button;
