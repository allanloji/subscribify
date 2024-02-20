import * as S from "./NotFound.styles";
import Image from "next/image";

function NotFound() {
  return (
    <S.Container>
      <h1>Not Found</h1>
      <p>Sorry, we couldn&apos;t find what you were looking for.</p>
      <Image
        src="https://illustrations.popsy.co/amber/crashed-error.svg"
        alt="A rocket crashed."
        width={300}
        height={300}
        priority
      />
    </S.Container>
  );
}

export default NotFound;
