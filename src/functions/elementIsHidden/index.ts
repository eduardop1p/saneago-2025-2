import { Page } from 'puppeteer';

interface Props {
  page: Page;
  selector: string;
}

export default async function elementIsHidden({ page, selector }: Props) {
  return await page.waitForFunction(
    selector => {
      return document.querySelector(selector) === null;
    },
    { timeout: 30000 },
    selector
  );
}
