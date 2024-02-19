import "@/styles/globals.css";
import "@/styles/hint.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <Component {...pageProps} />
      </QueryClientProvider>
    </main>
  );
}
