import { Spacer } from "@/components/ui";
import * as S from "./Newsletter.styles";
import { Users, Send } from "lucide-react";
import { getBackground } from "./utils";

interface NewsletterProps {
  name: string;
  recipients: number;
  id: string;
}

function Newsletter({ name, recipients, id }: NewsletterProps) {
  return (
    <S.Container>
      <S.TopImage id={id} />
      <S.TitleContainer>
        <S.Title>{name}</S.Title>
        <Spacer />
        <S.InfoContainer>
          <Users color="#666" />
          <Spacer horizontal size={0.5} />
          <S.Subtitle>{`${recipients}`}</S.Subtitle>
        </S.InfoContainer>
      </S.TitleContainer>
    </S.Container>
  );
}

export default Newsletter;
