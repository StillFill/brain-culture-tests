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
    slowMo: 500, // para visualizar melhor
  });
});

Before(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

Given("Usuário está na tela de gerenciamento", async function () {
  await page.goto("http://localhost:3000/management");
  const title = page.locator("h1");
  await expect(title).toBeVisible();
  await expect(await title.textContent()).toBe("Gerenciamento");
});

Given("Usuário seleciona criar um novo produtor", async () => {
  await page.locator("#new-produtor-form").click();
});

Given("Usuário deseja editar o produtor", async () => {
  await page.locator("#edit-button").click();
});

Then("Deve ser possivel preencher os dados de produtor e salvar", async () => {
  const documento = generate();

  const docInput = await page.locator("#documento");

  const docValue = await docInput.inputValue();

  if (docValue === "") {
    await page.locator("#documento").fill(documento);
  }

  await page.locator("#nome").fill("Mauricio Gregorio");
  await page.locator("#nome_fazenda").fill("Fazenda do Gregorio");
  await page.locator("#cidade").fill("São Paulo");
  await page.locator("#estado").fill("São Paulo");
  await page.locator("#area_total_fazenda").fill("10");
  await page.locator("#area_agricultavel_fazenda").fill("5");
  await page.locator("#area_vegetacao_fazenda").fill("3");

  const submitButton = page.locator("#submit-button");
  await submitButton.click();

  await page.waitForTimeout(3000);

  const docOnTable = page.getByText(docValue ? docValue : documento);

  await expect(docOnTable).toBeVisible();
});

Then("Usuário seleciona um produtor já existente", async () => {
  const produtoresButtons = page.getByText("Ver detalhes");
  const detailsButton = produtoresButtons.first();

  await detailsButton.click();
});

Then("Deve ser possivel remover um produtor", async () => {
  const produtoresButtons = page.getByText("Ver detalhes");
  const produtoresQuantity = await produtoresButtons.count();

  await page.locator("#delete-button").click();

  await page.waitForTimeout(1000);

  const produtoresButtonsAfterDelete = page.getByText("Ver detalhes");
  const produtoresQuantityAfterDelete =
    await produtoresButtonsAfterDelete.count();

  expect(produtoresQuantityAfterDelete).toBeLessThan(produtoresQuantity);
});

Given(
  "Deve ver mensagem de erro ao preencher os dados com as áreas incorretas",
  async () => {
    const documento = generate();
    await page.locator("#documento").fill(documento);
    await page.locator("#nome").fill("Mauricio Gregorio");
    await page.locator("#nome_fazenda").fill("Fazenda do Gregorio");
    await page.locator("#cidade").fill("São Paulo");
    await page.locator("#estado").fill("São Paulo");
    await page.locator("#area_total_fazenda").fill("10");
    await page.locator("#area_agricultavel_fazenda").fill("5");
    await page.locator("#area_vegetacao_fazenda").fill("10");

    const submitButton = page.locator("#submit-button");
    await submitButton.click();

    const errorMessage = page.locator("#area-total-error-message");

    await expect(errorMessage).toBeVisible();
  }
);

Given(
  "Deve ver mensagem de erro ao preencher os dados com o documento incorreto",
  async () => {
    await page.locator("#documento").fill("12345678965");
    await page.locator("#nome").fill("Mauricio Gregorio");
    await page.locator("#nome_fazenda").fill("Fazenda do Gregorio");
    await page.locator("#cidade").fill("São Paulo");
    await page.locator("#estado").fill("São Paulo");
    await page.locator("#area_total_fazenda").fill("10");
    await page.locator("#area_agricultavel_fazenda").fill("5");
    await page.locator("#area_vegetacao_fazenda").fill("5");

    const submitButton = page.locator("#submit-button");
    await submitButton.click();

    const errorMessage = page.locator("#documento-error-message");

    await expect(errorMessage).toBeVisible();
  }
);
