import Unsubscribe from "@/components/Unsubscribe";
import Head from "next/head";

export default function UnsusbcribePage() {
  return (
    <>
      <Head>
        <title>Unsubscribe from newsletter</title>
        <meta
          name="description"
          content="Subscribify - Unsubscribe newsletter"
        />
      </Head>
      <Unsubscribe />
    </>
  );
}
