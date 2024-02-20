import { render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const render = (ui: React.ReactElement) => ({
  ...rtlRender(ui, {
    wrapper,
  }),
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper: React.FC = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export * from "@testing-library/react";
export { render };
