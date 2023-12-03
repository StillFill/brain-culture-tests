import {
  Given,
  BeforeAll,
  Before,
  Then,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import playwright, {
  Browser,
  chromium,
  Page,
  BrowserContext,
  expect,
} from "@playwright/test";
import { generate } from "gerador-validador-cpf";

let browser: Browser;
let page: Page;
let context: BrowserContext;

setDefaultTimeout(50000);

BeforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
  });
});

Before(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

Given("Usuário está na tela de gerenciamento", async function () {
  await page.goto("http://localhost:3000/management");
  await expect(page.getByText("Gerenciamento")).toBeVisible();
});

Then("Deve ser possivel cadastrar um novo produtor", async () => {
  const documento = generate();
  await page.locator("#new-produtor-form").click();
  await page.locator("#documento").fill(documento);
  await page.locator("#nome").fill("Mauricio Gregorio");
  await page.locator("#nome_fazenda").fill("Fazenda do Gregorio");
  await page.locator("#cidade").fill("São Paulo");
  await page.locator("#estado").fill("São Paulo");
  await page.locator("#area_total_fazenda").fill("10");
  await page.locator("#area_agricultavel_fazenda").fill("5");
  await page.locator("#area_vegetacao_fazenda").fill("3");

  await page.locator("#submit-button").click();

  const docOnTable = page.getByText(documento);

  await page.waitForTimeout(3000);

  await expect(docOnTable).toBeVisible();
});

Then("Deve ser possivel remover um produtor", async () => {
  const produtoresButtons = page.getByText("Ver detalhes");
  const produtoresQuantity = await produtoresButtons.count();
  const detailsButton = produtoresButtons.first();

  await detailsButton.click();

  await page.locator("#delete-button").click();

  await page.waitForTimeout(1000);

  const produtoresButtonsAfterDelete = page.getByText("Ver detalhes");
  const produtoresQuantityAfterDelete =
    await produtoresButtonsAfterDelete.count();

  expect(produtoresQuantityAfterDelete).toBeLessThan(produtoresQuantity);
});
