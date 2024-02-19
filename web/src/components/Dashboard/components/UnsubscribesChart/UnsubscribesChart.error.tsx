import { Spacer } from "@/components/ui";
import * as S from "./UnsubscribesChart.styles";
import { Frown } from "lucide-react";

function UnsubscribesChartError() {
  return (
    <S.Container>
      <h2>Last 30 days unsubscribes</h2>
      <Spacer />
      <S.ErrorContainer>
        <span>Could not load the data. Please try again later</span>
        <Spacer size={2} />
        <Frown size={50} />
      </S.ErrorContainer>
    </S.Container>
  );
}

export default UnsubscribesChartError;
