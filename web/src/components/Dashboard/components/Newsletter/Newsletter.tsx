import { Spacer } from "@/components/ui";
import * as S from "./Newsletter.styles";
import { Users, Send, Pencil, Clock3, Trash2 } from "lucide-react";
import { getBackground } from "./utils";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import NewsletterPlaceholder from "./Newsletter.placeholder";
import { NewsletterEntity } from "@/api/Api";
import { api } from "@/api/utils";
import { queries } from "@/api/queries";

interface NewsletterProps {
  newsletter: NewsletterEntity;
}

function Newsletter({
  newsletter: { name, recipients, id, scheduledAt },
}: NewsletterProps) {
  const queryClient = useQueryClient();

  const { mutate: sendNewsletter, isPending: isPendingSendNewsletter } =
    useMutation({
      mutationFn: async () => {
        const response = await api.newsletters.send(id);

        if (!response.ok) {
          throw new Error("Failed to send newsletter");
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queries.stats._def });
        toast.success("Newsletter was sent! 🚀");
      },
      onError: () => {
        toast.error("Failed to send newsletter");
      },
    });

  const { mutate: deleteNewsletter, isPending: isPendingDeleteNewsletter } =
    useMutation({
      mutationFn: async () => {
        const response = await api.newsletters.remove(id);

        if (!response.ok) {
          throw new Error("Failed to delete newsletter");
        }
      },
      onSuccess: () => {
        toast.success("Newsletter was deleted! 🚀");
        queryClient.invalidateQueries({ queryKey: queries.newsletters._def });
      },
      onError: () => {
        toast.error("Failed to delete newsletter");
      },
    });

  const handleSendPress = () => {
    if (recipients.length === 0) {
      toast.error(
        "You need to have at least one recipient to send the newsletter"
      );
      return;
    }

    sendNewsletter();
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
          data-testid={`edit-newsletter-${id}`}
        >
          <Pencil />
        </Link>
        <Spacer horizontal size={0.5} />| <Spacer horizontal size={0.5} />
        <S.ButtonContainer
          disabled={isPendingSendNewsletter}
          onClick={handleSendPress}
          className="hint--top-left"
          aria-label="Send newsletter"
          data-testid={`send-newsletter-${id}`}
        >
          <Send />
        </S.ButtonContainer>
        <Spacer horizontal size={0.5} />| <Spacer horizontal size={0.5} />
        <S.ButtonContainer
          disabled={isPendingDeleteNewsletter}
          onClick={handleDeletePress}
          className="hint--top-left"
          aria-label="Delete newsletter"
          data-testid={`delete-newsletter-${id}`}
        >
          <Trash2 />
        </S.ButtonContainer>
      </S.CommandOptions>
      <S.Title>{name}</S.Title>
      <S.InfoContainer>
        <S.RecipientsContainer>
          <Users />
          <Spacer horizontal size={0.5} />
          <S.Subtitle
            data-testid={`${id}-number-of-recipients`}
          >{`${recipients.length}`}</S.Subtitle>
          {scheduledAt ? (
            <>
              <Spacer horizontal size={0.5} />|
              <Spacer horizontal size={0.5} />
              <Clock3 />
              <Spacer horizontal size={0.5} />
              <S.Subtitle data-testid={`${id}-scheduled-at`}>{`${format(
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
