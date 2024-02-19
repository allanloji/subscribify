import * as S from "./Dashboard.styles";
import { Spacer } from "../ui";
import Image from "next/image";

import GeneralStats from "./components/GeneralStats";
import UnsubscribesChart from "./components/UnsubscribesChart";
import NewslettersList from "./components/NewslettersList";

function Dashboard() {
  return (
    <>
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
          alt="A man working on a computer with a rocket on top of it."
          width={200}
          height={200}
          priority
        />
      </S.MessageContainer>
      <Spacer size={2} />
      <GeneralStats />
      <Spacer size={2} />
      <UnsubscribesChart />
      <Spacer size={2} />
      <NewslettersList />
    </>
  );
}

export default Dashboard;
