const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'e:/modulux-homes/frontend/docs/local-home.png', fullPage: true });

  await page.goto('https://moduluxhomes.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'e:/modulux-homes/frontend/docs/sample-home.png', fullPage: true });

  await browser.close();
})();
