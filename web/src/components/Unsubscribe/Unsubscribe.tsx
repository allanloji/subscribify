import { useRouter } from "next/router";
import * as S from "./Unsubscribe.styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "@/utils/constants";
import { Button, Spacer } from "../ui";
import { toast } from "sonner";

function Unsubscribe() {
  const router = useRouter();

  const { recipient, newsletter: id } = router.query;

  const { data: newsletter, isLoading } = useQuery({
    queryKey: ["newsletter", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/newsletters/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
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

  if (isLoading) {
    return null;
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
