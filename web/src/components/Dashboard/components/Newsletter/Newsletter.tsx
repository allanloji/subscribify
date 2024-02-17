import { Spacer } from "@/components/ui";
import * as S from "./Newsletter.styles";
import { Users, Send, Pencil } from "lucide-react";
import { getBackground } from "./utils";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/utils/constants";
import { toast } from "sonner";

interface NewsletterProps {
  name: string;
  recipients: number;
  id: string;
}

function Newsletter({ name, recipients, id }: NewsletterProps) {
  const { mutate } = useMutation({
    mutationFn: async () => {
      fetch(`${API_URL}/newsletters/${id}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast.success("Newsletter was sent! 🚀");
    },
  });

  const handleSendPress = () => {
    if (recipients === 0) {
      toast.error(
        "You need to have at least one recipient to send the newsletter"
      );
      return;
    }

    mutate();
  };
  return (
    <S.Container background={getBackground(id)}>
      <S.CommandOptions>
        <Link href={`/newsletters/${id}/edit`}>
          <Pencil />
        </Link>
        <Spacer horizontal size={0.5} />| <Spacer horizontal size={0.5} />
        <S.ButtonContainer onClick={handleSendPress}>
          <Send />
        </S.ButtonContainer>
      </S.CommandOptions>
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
