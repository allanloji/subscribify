import * as S from "./Dashboard.styles";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/utils/constants";
import Newsletter from "./components/Newsletter/Newsletter";
import { Spacer } from "../ui";
import StatCard from "./components/StatCard";
import { MailCheck, UserX, Users } from "lucide-react";
import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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

  const { data: unsubscribresData } = useQuery({
    queryKey: ["unsubscribes"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/unsubscribes`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    select: (data) => {
      return data.map((d: any) => ({
        name: d.date,
        count: d.count,
      }));
    },
  });

  console.log(unsubscribresData);

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
      {unsubscribresData && (
        <S.ChartContainer>
          <h2>Last month unsubscribes</h2>
          <Spacer />
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart
              data={unsubscribresData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" padding={{ right: 20 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorCount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </S.ChartContainer>
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
