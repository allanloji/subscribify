import "@/styles/globals.css";
import "@/styles/hint.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";

import { Toaster } from "sonner";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [shouldRender, setShouldRender] = useState(
    !process.env.NEXT_PUBLIC_API_MOCKING
  );
  useEffect(() => {
    async function initMocks() {
      if (typeof window !== "undefined") {
        const { worker } = await import("@/utils/tests/server");
        await worker.start();
        setShouldRender(true);
      }
    }
    if (process.env.NEXT_PUBLIC_API_MOCKING) {
      initMocks();
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <main className={roboto.className}>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <Component {...pageProps} />
      </QueryClientProvider>
    </main>
  );
}
