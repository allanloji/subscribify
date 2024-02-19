import { Spacer } from "@/components/ui";
import * as S from "./Newsletter.styles";
import { Users, Send, Pencil, Clock3, Trash2 } from "lucide-react";
import { getBackground } from "./utils";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/utils/constants";
import { toast } from "sonner";
import { format } from "date-fns";
import NewsletterPlaceholder from "./Newsletter.placeholder";

interface NewsletterProps {
  name: string;
  recipients: number;
  id: string;
  scheduledAt?: string;
}

function Newsletter({ name, recipients, id, scheduledAt }: NewsletterProps) {
  const queryClient = useQueryClient();

  const { mutate: send } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/newsletters/${id}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to send newsletter");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
      toast.success("Newsletter was sent! 🚀");
    },
    onError: () => {
      toast.error("Failed to send newsletter");
    },
  });

  const { mutate: deleteNewsletter } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/newsletters/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete newsletter");
      }
    },
    onSuccess: () => {
      toast.success("Newsletter was deleted! 🚀");
      queryClient.invalidateQueries({ queryKey: ["newsletters"] });
    },
    onError: () => {
      toast.error("Failed to delete newsletter");
    },
  });

  const handleSendPress = () => {
    if (recipients === 0) {
      toast.error(
        "You need to have at least one recipient to send the newsletter"
      );
      return;
    }

    send();
  };

  const handleDeletePress = () => {
    deleteNewsletter();
  };

  return (
    <S.Container background={getBackground(id)}>
      <S.CommandOptions>
        <Link
          href={`/newsletters/${id}/edit`}
          className="hint--top"
          aria-label="Edit newsletter"
        >
          <Pencil />
        </Link>
        <Spacer horizontal size={0.5} />| <Spacer horizontal size={0.5} />
        <S.ButtonContainer
          onClick={handleSendPress}
          className="hint--top-left"
          aria-label="Send newsletter"
        >
          <Send />
        </S.ButtonContainer>
        <Spacer horizontal size={0.5} />| <Spacer horizontal size={0.5} />
        <S.ButtonContainer
          onClick={handleDeletePress}
          className="hint--top-left"
          aria-label="Delete newsletter"
        >
          <Trash2 />
        </S.ButtonContainer>
      </S.CommandOptions>
      <S.Title>{name}</S.Title>
      <S.InfoContainer>
        <S.RecipientsContainer>
          <Users />
          <Spacer horizontal size={0.5} />
          <S.Subtitle>{`${recipients}`}</S.Subtitle>
          {scheduledAt ? (
            <>
              <Spacer horizontal size={0.5} />|
              <Spacer horizontal size={0.5} />
              <Clock3 />
              <Spacer horizontal size={0.5} />
              <S.Subtitle>{`${format(
                scheduledAt,
                "dd/MM/yy', 'HH:mm"
              )}`}</S.Subtitle>
            </>
          ) : null}
        </S.RecipientsContainer>
      </S.InfoContainer>
    </S.Container>
  );
}

Newsletter.Placeholder = NewsletterPlaceholder;

export default Newsletter;
