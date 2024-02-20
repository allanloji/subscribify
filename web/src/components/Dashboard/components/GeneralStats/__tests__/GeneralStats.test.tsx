import { beforeAll, afterEach, afterAll, expect, test } from "vitest";
import { server } from "@/utils/tests/server";
import { waitFor } from "@testing-library/react";
import GeneralStats from "..";
import { render } from "@/utils/tests/renderApp";
import { HttpResponse, http } from "msw";
import { API_URL } from "@/utils/constants";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders the general stats placeholder", async () => {
  const { container } = render(<GeneralStats />);

  expect(container).toMatchSnapshot();
});

test("renders the general stats with data", async () => {
  const { queryByText } = render(<GeneralStats />);

  await waitFor(() => {
    expect(queryByText("Total recipients")).not.toBe(null);
    expect(queryByText("Total emails sent")).not.toBe(null);
    expect(queryByText("Total unsubscribes")).not.toBe(null);
  });
});

test("renders the general stats error", async () => {
  server.use(http.get(`${API_URL}/statistics`, () => HttpResponse.error()));

  const { queryByText } = render(<GeneralStats />);

  await waitFor(() => {
    expect(queryByText("Could not load stats")).not.toBe(null);
  });
});
