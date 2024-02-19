import { Spacer } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { MailCheck, UserX, Users } from "lucide-react";
import * as S from "./GeneralStats.styles";
import GeneralStatsPlaceholder from "./GeneralStats.placeholder";
import GeneralStatsError from "./GeneralStats.error";
import { queries } from "@/api/queries";

function GeneralStats() {
  const {
    data: stats,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useQuery({ ...queries.stats.all });

  if (isLoadingStats) {
    return <GeneralStatsPlaceholder />;
  }

  if (isErrorStats || !stats) {
    return <GeneralStatsError />;
  }

  return (
    <section>
      <h2>Overall Stats</h2>
      <Spacer />
      <S.Container>
        <StatCard
          title="Total recipients"
          value={stats.totalRecipients}
          icon={<Users />}
          color="#D04848"
        />
        <StatCard
          title="Total emails sent"
          value={stats.totalEmailsSent}
          icon={<MailCheck />}
          color="#6895D2"
        />
        <StatCard
          title="Total unsubscribes"
          value={stats.totalUnsubscribes}
          icon={<UserX />}
          color="#F3B95F"
        />
      </S.Container>
    </section>
  );
}

export default GeneralStats;
