const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: 'e:/modulux-homes/frontend/docs/local-home-fold.png' });

  await page.goto('https://moduluxhomes.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'e:/modulux-homes/frontend/docs/sample-home-fold.png' });

  await browser.close();
})();
