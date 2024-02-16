import Dashboard from "@/components/Dashboard";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Subscribify</title>
        <meta name="description" content="Manage your newsletters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
}
