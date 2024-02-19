import { Spacer } from "@/components/ui";
import StatCard from "../StatCard";
import { Frown } from "lucide-react";
import * as S from "./GeneralStats.styles";

function GeneralStatsError() {
  return (
    <>
      <h2>Overall Stats</h2>
      <Spacer />
      <S.Container>
        <StatCard
          title="Could not load stats"
          value="Error"
          icon={<Frown />}
          color="#D04848"
        />
      </S.Container>
    </>
  );
}

export default GeneralStatsError;
