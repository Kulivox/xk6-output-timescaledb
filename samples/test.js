import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  	tags: {
		replicaId: __ENV.HOSTNAME,
		testid: 'SurveyM_2024-08-24-7-25PM'
	},
    scenarios: {
	    ui: {
			executor: 'shared-iterations',
			vus: 5,
			iterations: 25,
			options: {
				browser: {
				  type: 'chromium',
				},
			},
	    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');

    await Promise.all([page.waitForNavigation(), page.locator('input[type="submit"]').click()]);

    const header = await page.locator('h2').textContent();

    check(header, {
      header: (h) => h == 'Welcome, admin!',
    });
  } finally {
    await page.close();
  }
}