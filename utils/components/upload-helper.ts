import type { Page } from "@playwright/test";

export const uploadFileByIndex = async (
  page: Page,
  filePath: string,
  index = 0,
): Promise<void> => {
  const fileInputs = page.locator('input[type="file"]');
  await fileInputs.nth(index).setInputFiles(filePath);
};
