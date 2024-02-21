import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Spacer } from "../ui";
import * as S from "./Unsubscribe.styles";

function UnsubscribePlaceholder() {
  return (
    <S.Container>
      <S.MessageContainer>
        <Skeleton height={24} width={300} />
        <Spacer size={2} />
        <Skeleton height={16} width={200} />
        <Spacer size={2} />

        <Skeleton height={48} width={250} />
      </S.MessageContainer>
    </S.Container>
  );
}

export default UnsubscribePlaceholder;
