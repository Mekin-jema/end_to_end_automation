import type { Page } from "@playwright/test";

/**
 * Uploads a file using the file input element by index
 * @param page - Playwright Page object
 * @param filePath - Path to the file to upload
 * @param index - Index of the file input element (default: 0 for first)
 */
 const uploadFileByIndex = async (
  page: Page,
  filePath: string,
  index: number = 0
): Promise<void> => {
  const fileInputs = page.locator('input[type="file"]');
  const fileInput = fileInputs.nth(index);
  await fileInput.setInputFiles(filePath);
};
export default uploadFileByIndex;
