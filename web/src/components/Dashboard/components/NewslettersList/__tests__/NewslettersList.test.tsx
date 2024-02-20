import { beforeAll, afterEach, afterAll, expect, test } from "vitest";
import { server } from "@/utils/tests/server";
import { waitFor } from "@testing-library/react";
import { render } from "@/utils/tests/renderApp";
import { HttpResponse, http } from "msw";
import { API_URL } from "@/utils/constants";
import NewslettersList from "..";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders the newsletters list placeholder", async () => {
  const { container } = render(<NewslettersList />);

  expect(container).toMatchSnapshot();
});

test("renders the newsletters list with data", async () => {
  const { queryByText } = render(<NewslettersList />);

  await waitFor(() => {
    expect(queryByText("Newsletter 1")).not.toBe(null);
    expect(queryByText("Newsletter 2")).not.toBe(null);
  });
});

test("renders the newsletters list with no data", async () => {
  server.use(http.get(`${API_URL}/newsletters`, () => HttpResponse.json([])));

  const { queryByText } = render(<NewslettersList />);

  await waitFor(() => {
    expect(queryByText("No newsletters found")).not.toBe(null);
  });
});

test("renders the newsletters list error", async () => {
  server.use(http.get(`${API_URL}/newsletters`, () => HttpResponse.error()));

  const { queryByText } = render(<NewslettersList />);

  await waitFor(() => {
    expect(
      queryByText(
        "There was an error. We could not get the newsletters. Try again later"
      )
    ).not.toBe(null);
  });
});
