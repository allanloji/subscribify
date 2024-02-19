import EditNewsletter from "@/components/EditNewsletter";
import { API_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";

export default function EditNewsLetterPage() {
  const router = useRouter();
  const { id } = router.query;

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
    enabled: !!id,
  });

  return (
    <>
      <Head>
        <title>Edit newsletter</title>
        <meta name="description" content="Subscribify - Edit newsletter" />
      </Head>
      {isLoading || !newsletter ? null : (
        <EditNewsletter newsletter={newsletter} />
      )}
    </>
  );
}
