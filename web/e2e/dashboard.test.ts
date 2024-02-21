import { expect, test } from "@playwright/test";

test("should display the dashboard with info", async ({ page }) => {
  await page.goto("/");
  const title = page.getByRole("heading", { name: /subscribify/i });
  await expect(title).toBeVisible();

  const totalRecipients = page.getByText(/Total recipients/i);
  await expect(totalRecipients).toBeVisible();

  const totalEmailsSent = page.getByText(/Total emails sent/i);
  await expect(totalEmailsSent).toBeVisible();

  const totalUnsubscribes = page.getByText(/Total unsubscribes/i);
  await expect(totalUnsubscribes).toBeVisible();

  const graph = page.getByText(/2024-01-02/i);
  await expect(graph).toBeVisible();

  const newsletter = page.getByText(/Newsletter 1/i);
  await expect(newsletter).toBeVisible();

  const editLink = page.getByTestId("edit-newsletter-1");
  await expect(editLink).toBeVisible();

  const sendButton = page.getByTestId("send-newsletter-1");
  await expect(sendButton).toBeVisible();

  const deleteButton = page.getByTestId("delete-newsletter-1");
  await expect(deleteButton).toBeVisible();

  const recipients = page.getByTestId("1-number-of-recipients");
  await expect(recipients).toBeVisible();

  const scheduledAt = page.getByTestId("1-scheduled-at");
  await expect(scheduledAt).toBeVisible();
});
