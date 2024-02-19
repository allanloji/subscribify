import { Spacer } from "@/components/ui";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import * as S from "./UnsubscribesChart.styles";

function UnsubscribesChartPlaceholder() {
  return (
    <S.Container>
      <Skeleton height={24} width={300} />
      <Spacer />
      <Skeleton height={300} />
    </S.Container>
  );
}

export default UnsubscribesChartPlaceholder;
