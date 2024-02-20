import { expect, test } from "@playwright/test";

test("should see newsletter edit form from dashboard", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const title = page.getByRole("heading", { name: /subscribify/i });
  await expect(title).toBeVisible();

  const editLink = page.getByTestId("edit-newsletter-1");
  await editLink.click();

  const createTitle = page.getByRole("heading", {
    name: /update newsletter 1/i,
  });
  await expect(createTitle).toBeVisible();

  const nameInput = page.getByLabel(/Name/i);
  await expect(nameInput).toHaveValue("Newsletter 1");

  const fileLink = page.getByRole("link", { name: /download saved file/i });
  await expect(fileLink).toBeVisible();

  const scheduleInput = page.getByLabel(/date and time/i);
  await expect(scheduleInput).toHaveValue("2024-01-01T06:00");
});
