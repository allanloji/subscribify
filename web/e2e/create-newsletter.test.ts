import { expect, test } from "@playwright/test";

test("should see newsletter form from dashboard", async ({ page }) => {
  await page.goto("/");
  const title = page.getByRole("heading", { name: /subscribify/i });
  await expect(title).toBeVisible();

  const createButton = page.getByRole("link", {
    name: /create a new newsletter/i,
  });
  await expect(createButton).toBeVisible();
  await createButton.click();

  const createTitle = page.getByRole("heading", {
    name: /Create your newsletter/i,
  });
  await expect(createTitle).toBeVisible();

  const nameInput = page.getByLabel(/Name/i);
  await nameInput.fill("Cool newsletter");

  const recipientsInput = page.getByRole("textbox", {
    name: /email@example.com/i,
  });
  await recipientsInput.fill("test@email.com");

  const scheduleInput = page.getByLabel(/date and time/i);
  await scheduleInput.fill("2034-01-01T12:00");
});
