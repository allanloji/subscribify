import { Spacer } from "@/components/ui";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StatCard from "../StatCard";
import * as S from "./GeneralStats.styles";

function GeneralStatsPlaceholder() {
  return (
    <>
      <Skeleton height={24} width={300} />
      <Spacer />
      <S.Container>
        <StatCard.Placeholder />
        <StatCard.Placeholder />
        <StatCard.Placeholder />
      </S.Container>
    </>
  );
}

export default GeneralStatsPlaceholder;
