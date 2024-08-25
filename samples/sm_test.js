import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  	tags: {
		replicaId: __ENV.HOSTNAME,
		testid: 'SurveyM_2024-08-24-11-00PM'
	},
    scenarios: {
	    ui: {
			executor: 'shared-iterations',
			vus: 2,
			iterations: 4,
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
  const do_screenshots = false;

  try {
    await page.goto('https://www.surveymonkey.com/r/xxxxx');

    //Q1
    const q1_radio_rand = await page.locator(`div.question-row:nth-child(1) div.answer-option-cell:nth-child(${Math.floor(Math.random() * 5) + 1})`);
    await Promise.all([q1_radio_rand.focus(), q1_radio_rand.click()]);

    //Q2
    const q2_radio_rand = await page.locator(`div.question-row:nth-child(2) div.answer-option-cell:nth-child(${Math.floor(Math.random() * 2) + 1})`);
    await Promise.all([q2_radio_rand.focus(), q2_radio_rand.click()]);

    if (do_screenshots) await page.screenshot({ path: `./screenshots/${new Date().toISOString()}-${__ENV.HOSTNAME}.png` });

    //Q3
    const q3_check_a1 = await page.locator('div.question-row:nth-child(3) div.answer-option-cell:nth-child(1)');
    await Promise.all([q3_check_a1.focus(), q3_check_a1.click()]);
    const q3_check_a3 = await page.locator('div.question-row:nth-child(3) div.answer-option-cell:nth-child(3)');
    await Promise.all([q3_check_a3.focus(), q3_check_a3.click()]);

    //Q4
    const q4_radio_a1 = await page.locator('div.question-row:nth-child(4) div.answer-option-cell:nth-child(1)');
    await Promise.all([q4_radio_a1.focus(), q4_radio_a1.click()]);

    if (do_screenshots) await page.screenshot({ path: `./screenshots/${new Date().toISOString()}-${__ENV.HOSTNAME}.png` });

    //Q5
    const q5_radio_a1 = await page.locator('div.question-row:nth-child(5) div.answer-option-cell:nth-child(1)');
    await Promise.all([q5_radio_a1.focus(), q5_radio_a1.click()]);

    //Q6
    const q6_radio_a3 = await page.locator('div.question-row:nth-child(6) div.answer-option-cell:nth-child(3)');
    await Promise.all([q6_radio_a3.focus(), q6_radio_a3.click()]);

    if (do_screenshots) await page.screenshot({ path: `./screenshots/${new Date().toISOString()}-${__ENV.HOSTNAME}.png` });

    //Q7
    const q7_check_a3 = await page.locator('div.question-row:nth-child(7) div.answer-option-cell:nth-child(3)');
    await Promise.all([q7_check_a3.focus(), q7_check_a3.click()]);

    //Q8
    const q8_radio_a1 = await page.locator(`div.question-row:nth-child(8) div.answer-option-cell:nth-child(${Math.floor(Math.random() * 3) + 1})`);
    await Promise.all([q8_radio_a1.focus(), q8_radio_a1.click()]);

    if (do_screenshots) await page.screenshot({ path: `./screenshots/${new Date().toISOString()}-${__ENV.HOSTNAME}.png` });

    //Q9
    const q9_input = await page.locator('div.question-row:nth-child(9) input');
    await Promise.all([q9_input.focus(), q9_input.type(`Random answer #${Math.floor(Math.random() * 10000000) + 1}`)]);

    //Q10
    const q10_input = await page.locator('div.question-row:nth-child(10) input');
    await Promise.all([q10_input.focus(), q10_input.type(`random${Math.floor(Math.random() * 10000000) + 1}@no-anwer-tech.com`)]);

    if (do_screenshots) await page.screenshot({ path: `./screenshots/${new Date().toISOString()}-${__ENV.HOSTNAME}.png` });

    // Done
    await Promise.all([page.waitForNavigation(), page.locator('div.survey-submit-actions button').click()]);

    if (do_screenshots) await page.screenshot({ path: `./screenshots/${new Date().toISOString()}-${__ENV.HOSTNAME}.png` });

    // Check we are on thank you page
    const donePageUrl = page.url();
    check(donePageUrl, { 
        'Thanks Page Shown': (r) => r.includes('survey-thanks'),
    });
  } finally {
    await page.close();
  }
}