import { Spacer } from "@/components/ui";
import { API_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

import Newsletter from "../Newsletter";
import * as S from "./NewslettersList.styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function NewslettersList() {
  const { data: newsletters, isLoading: isLoadingNewsletters } = useQuery({
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

  if (isLoadingNewsletters) {
    return (
      <>
        <Skeleton height={24} width={300} />
        <Spacer />
        <Skeleton height={24} width={500} />
        <Spacer size={2} />
        <S.Container>
          <Newsletter.Placeholder />
          <Newsletter.Placeholder />
          <Newsletter.Placeholder />
        </S.Container>
      </>
    );
  }

  return (
    <>
      <h2>NewsLetters</h2>
      <Spacer />
      <S.CreateLink href="/newsletters/create">
        Create a new newsletter
      </S.CreateLink>
      <Spacer size={2} />
      <S.Container>
        {newsletters?.map((newsletter) => (
          <Newsletter
            key={newsletter.id}
            name={newsletter.name}
            recipients={newsletter.recipients.length}
            id={newsletter.id}
            scheduledAt={newsletter.scheduledAt}
          />
        ))}
      </S.Container>
    </>
  );
}

export default NewslettersList;
