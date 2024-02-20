import { expect, test } from "vitest";
import { render } from "@/utils/tests/renderApp";
import Newsletter from "../Newsletter";

test("renders the newsletter placeholder", async () => {
  const newsletter = {
    id: "1",
    file: "newsletter-1.pdf",
    name: "Newsletter 1",
    scheduledAt: "2024-01-01T12:00:00.000Z",
    recipients: [
      {
        email: "test@email.com",
      },
      {
        email: "test2@email.com",
      },
    ],
  };
  const { getByText } = render(<Newsletter newsletter={newsletter} />);

  const name = getByText("Newsletter 1");

  expect(name).not.toBe(null);
});
