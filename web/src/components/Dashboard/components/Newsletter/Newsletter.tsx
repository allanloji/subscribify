import { Spacer } from "@/components/ui";
import * as S from "./Newsletter.styles";
import { Users, Send } from "lucide-react";
import { getBackground } from "./utils";
import { useRouter } from "next/router";

interface NewsletterProps {
  name: string;
  recipients: number;
  id: string;
}

function Newsletter({ name, recipients, id }: NewsletterProps) {
  const router = useRouter();
  return (
    <S.Container
      background={getBackground(id)}
      onClick={() => router.push(`newsletters/${id}/edit`)}
    >
      <S.Title>{name}</S.Title>
      <S.InfoContainer>
        <S.RecipientsContainer>
          <Users />
          <Spacer horizontal size={0.5} />
          <S.Subtitle>{`${recipients}`}</S.Subtitle>
        </S.RecipientsContainer>
      </S.InfoContainer>
    </S.Container>
  );
}

export default Newsletter;
