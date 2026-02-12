import path from "path";
import { test as base, expect as baseExpect, Page, type TestInfo } from "@playwright/test";
import * as allure from "allure-js-commons";

export const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  glitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
};

async function loginWith(page: Page, username: string, password: string) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

type Fixtures = {
  login: (username?: string, password?: string) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  login: async ({ page }, use) => {
    const fn = async (
      username: string = USERS.standard.username,
      password: string = USERS.standard.password,
    ) => {
      await loginWith(page, username, password);
    };
    await use(fn);
  },
});

const DEFAULT_EPIC = "test_demo";

function getSuiteParts(testInfo: TestInfo) {
  const parts = testInfo.file.split(path.sep);
  const rootIndex = parts.lastIndexOf("test_demo");
  const suiteParts = rootIndex >= 0 ? parts.slice(rootIndex + 1, -1) : [];
  return suiteParts.filter(Boolean);
}

function hasDescription(testInfo: TestInfo) {
  return testInfo.annotations.some((annotation) => annotation.type === "description");
}

test.beforeEach(async ({}, testInfo) => {
  const suiteParts = getSuiteParts(testInfo);
  const epic = suiteParts[0] ?? DEFAULT_EPIC;
  const feature = suiteParts[1] ?? suiteParts[0];
  const owner = process.env.ALLURE_OWNER ?? process.env.USER ?? "automation";
  const project = testInfo.project?.name ?? "default";
  const relativeFile = path.relative(process.cwd(), testInfo.file);

  if (!hasDescription(testInfo)) {
    await allure.description(testInfo.title);
  }

  await allure.epic(epic);
  if (feature) {
    await allure.feature(feature);
  }
  await allure.story(testInfo.title);
  await allure.owner(owner);
  await allure.parameter("browser", project);
  await allure.parameter("file", relativeFile);
  if (suiteParts.length) {
    await allure.tags(...suiteParts, project);
  } else {
    await allure.tags(project);
  }
});

export const expect = baseExpect;
