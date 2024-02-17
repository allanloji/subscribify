import * as S from "./Dashboard.styles";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/utils/constants";
import Newsletter from "./components/Newsletter/Newsletter";

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
      <S.Subtitle>Manage your newsletters in an easy way</S.Subtitle>
      <S.CreateLink href="/newsletters">Create a new newsletter</S.CreateLink>
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
