import { Spacer } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import Newsletter from "../Newsletter";
import * as S from "./NewslettersList.styles";
import NewslettersListPlaceholder from "./NewslettersList.placeholder";
import { BadgeX } from "lucide-react";
import NewslettersListError from "./NewslettersList.error";
import { queries } from "@/api/queries";

function NewslettersList() {
  const {
    data: newsletters,
    isLoading: isLoadingNewsletters,
    isError: isErrorNewsletters,
  } = useQuery({
    ...queries.newsletters.all,
  });

  if (isLoadingNewsletters) {
    return <NewslettersListPlaceholder />;
  }

  if (isErrorNewsletters || !newsletters) {
    return <NewslettersListError />;
  }

  return (
    <section>
      <h2>NewsLetters</h2>
      <Spacer />
      <S.CreateLink href="/newsletters/create">
        Create a new newsletter
      </S.CreateLink>
      <Spacer size={2} />
      {newsletters.length === 0 ? (
        <S.EmptyContainer>
          <h3>No newsletters found</h3>
          <Spacer size={2} />
          <BadgeX size={64} />
          <Spacer size={2} />
          <S.CreateLink href="/newsletters/create">
            Create a new newsletter
          </S.CreateLink>
        </S.EmptyContainer>
      ) : (
        <S.Container>
          {newsletters?.map((newsletter) => (
            <Newsletter key={newsletter.id} newsletter={newsletter} />
          ))}
        </S.Container>
      )}
    </section>
  );
}

export default NewslettersList;
