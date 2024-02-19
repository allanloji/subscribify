import CreateNewsletter from "@/components/CreateNewsletter";
import Head from "next/head";

export default function Newsletter() {
  return (
    <>
      <Head>
        <title>Create newsletter</title>
        <meta name="description" content="Subscribify - Create a newsletter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateNewsletter />
    </>
  );
}
