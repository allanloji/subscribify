import { beforeAll, afterEach, afterAll, expect, test } from "vitest";
import { server } from "@/utils/tests/server";
import { waitFor } from "@testing-library/react";
import { render } from "@/utils/tests/renderApp";
import { HttpResponse, http } from "msw";
import { API_URL } from "@/utils/constants";
import UnsubscribesChart from "..";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders the unsubscribes placeholder", async () => {
  const { container } = render(<UnsubscribesChart />);

  expect(container).toMatchSnapshot();
});
