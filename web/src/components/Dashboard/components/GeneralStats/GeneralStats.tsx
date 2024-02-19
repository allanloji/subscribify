import { Spacer } from "@/components/ui";
import { API_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import StatCard from "../StatCard";
import { MailCheck, UserX, Users } from "lucide-react";
import * as S from "./GeneralStats.styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function GeneralStats() {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/statistics`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });

  if (isLoadingStats) {
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

  return (
    <>
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
    </>
  );
}

export default GeneralStats;
