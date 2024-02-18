import * as S from "./Dashboard.styles";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/utils/constants";
import Newsletter from "./components/Newsletter/Newsletter";
import { Spacer } from "../ui";
import StatCard from "./components/StatCard";
import { MailCheck, UserX, Users } from "lucide-react";
import Image from "next/image";

function Dashboard() {
  const { data: newsletters } = useQuery({
    queryKey: ["newsletters"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/newsletters`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });

  const { data: stats } = useQuery({
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

  return (
    <main>
      <S.Title>subscribify</S.Title>
      <S.Subtitle>Manage your newsletters in an easy way 🗞️</S.Subtitle>
      <Spacer size={2} />
      <S.MessageContainer>
        <S.MessageContent>
          <S.MessageTitle>
            Hi, <strong>Admin</strong>
          </S.MessageTitle>
          <Spacer />
          <S.MessageSubtitle>
            Welcome to Subscribify! Here you can manage your newsletters and
            send them to your subscribers.
          </S.MessageSubtitle>
        </S.MessageContent>

        <Image
          src="https://illustrations.popsy.co/green/idea-launch.svg"
          alt="Newsletter"
          width={200}
          height={200}
        />
      </S.MessageContainer>
      <Spacer size={2} />
      {stats && (
        <>
          <h2>Overall Stats</h2>
          <S.StatsContainer>
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
          </S.StatsContainer>
        </>
      )}
      <Spacer size={2} />
      <h2>NewsLetters</h2>
      <Spacer />
      <S.CreateLink href="/newsletters/create">
        Create a new newsletter
      </S.CreateLink>
      <Spacer size={2} />
      <S.NewslettersContainer>
        {newsletters?.map((newsletter) => (
          <Newsletter
            key={newsletter.id}
            name={newsletter.name}
            recipients={newsletter.recipients.length}
            id={newsletter.id}
          />
        ))}
      </S.NewslettersContainer>
    </main>
  );
}

export default Dashboard;
