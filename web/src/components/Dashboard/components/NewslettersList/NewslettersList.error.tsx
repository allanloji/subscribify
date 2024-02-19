import { Spacer } from "@/components/ui";
import * as S from "./NewslettersList.styles";
import { Frown } from "lucide-react";

function NewslettersListError() {
  return (
    <>
      <h2>NewsLetters</h2>
      <Spacer />
      <S.EmptyContainer>
        <span>
          There was an error. We could not get the newsletters. Try again later
        </span>
        <Spacer size={2} />
        <Frown size={64} />
      </S.EmptyContainer>
    </>
  );
}

export default NewslettersListError;
