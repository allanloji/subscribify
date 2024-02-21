import { useRouter } from "next/router";
import * as S from "./Unsubscribe.styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "@/utils/constants";
import { Button, Spacer } from "../ui";
import { toast } from "sonner";
import { queries } from "@/api/queries";
import NotFound from "../NotFound";
import UnsubscribePlaceholder from "./Unsubscribe.placeholder";

function Unsubscribe() {
  const router = useRouter();

  const { recipient, newsletter: id } = router.query;

  const {
    data: newsletter,
    isLoading: isLoadingNewsletter,
    isError: isErrorNewsletter,
  } = useQuery({
    ...queries.newsletters.detail(id as string),
  });

  const { mutate: unsubscribe } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/newsletters/${id}/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: recipient }),
      });

      return response.json();
    },
    onSuccess: () => {
      toast.success("You were unsubscribed of this newsletter! 🗞️");
    },
  });

  if (isLoadingNewsletter) {
    return <UnsubscribePlaceholder />;
  }

  if (!newsletter || isErrorNewsletter) {
    return <NotFound />;
  }

  return (
    <S.Container>
      <S.MessageContainer>
        <h1> Confirm to unsubscribe</h1>
        <Spacer size={2} />
        <S.Subtitle>We are sorry to see you go 🥲</S.Subtitle>
        <Spacer size={2} />
        <S.Message>
          Click the button to unsubscribe of <strong>{newsletter.name}</strong>{" "}
          and no longer receive emails from this newsletter.
        </S.Message>
        <Spacer size={2} />
        <Button onClick={() => unsubscribe()}>Unsubscribe</Button>
      </S.MessageContainer>
    </S.Container>
  );
}

export default Unsubscribe;
