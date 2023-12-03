import { Given, BeforeAll, Before, Then } from "@cucumber/cucumber";
import playwright, {
  Browser,
  chromium,
  Page,
  BrowserContext,
  expect,
} from "@playwright/test";

let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
  });
});

Before(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

Given("Usuário está na tela de dashboard", async function () {
  await page.goto("http://localhost:3000");
  const title = page.locator("h1");
  await expect(title).toBeVisible();
  await expect(await title.textContent()).toBe("Dashboard");
});

Then(
  "Deve ser possivel visualizar o grafico com titulo {string}",
  async (titulo) => {
    await expect(page.getByText(titulo)).toBeVisible();
  }
);
