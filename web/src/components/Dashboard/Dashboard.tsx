import * as S from "./Dashboard.styles";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/utils/constants";
import Newsletter from "./components/Newsletter/Newsletter";
import { Spacer } from "../ui";

function Dashboard() {
  const { data } = useQuery({
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

  console.log(data);

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

        <S.MessageImage
          src="https://illustrations.popsy.co/green/idea-launch.svg"
          alt="Newsletter"
          width={200}
          height={200}
        />
      </S.MessageContainer>
      <S.CreateLink href="/newsletters/create">
        Create a new newsletter
      </S.CreateLink>
      <S.NewslettersContainer>
        {data?.map((newsletter) => (
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
