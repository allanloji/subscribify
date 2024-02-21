import { queries } from "@/api/queries";
import EditNewsletter from "@/components/EditNewsletter";
import NotFound from "@/components/NotFound";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";

export default function EditNewsLetterPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: newsletter, isLoading } = useQuery({
    ...queries.newsletters.detail(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Edit newsletter</title>
          <meta name="description" content="Subscribify - Edit newsletter" />
        </Head>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Edit newsletter</title>
        <meta name="description" content="Subscribify - Edit newsletter" />
      </Head>
      {!newsletter ? <NotFound /> : <EditNewsletter newsletter={newsletter} />}
    </>
  );
}
