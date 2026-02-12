import path from "path";
import { test as base, expect, type TestInfo } from "@playwright/test";
import * as allure from "allure-js-commons";

const DEFAULT_EPIC = "tests";

function getSuiteParts(testInfo: TestInfo) {
  const parts = testInfo.file.split(path.sep);
  const testsIndex = parts.lastIndexOf("tests");
  const suiteParts = testsIndex >= 0 ? parts.slice(testsIndex + 1, -1) : [];
  return suiteParts.filter(Boolean);
}

function hasDescription(testInfo: TestInfo) {
  return testInfo.annotations.some((annotation) => annotation.type === "description");
}

const test = base;

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

export { test, expect };