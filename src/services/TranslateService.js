const Languages = require('../configs/languages.json');
const { SCRAPER_URL } = require('../constants/App');
const puppeteer = require('puppeteer');

module.exports = {
	translate: async (params) => {
		try {
			const browser = await puppeteer.launch({
				ignoreHTTPSErrors: true,
				headless: true,
			});
			const page = await browser.newPage();
			await page.goto(`${SCRAPER_URL}?
			hl=${params.language}&
			sl=${params.from}&
			tl=${params.to}&
			text=${params.text}&
			op=translate`, { waitUntil: 'networkidle2' });

			const translater = await page.evaluate(() => {
				const text = document.getElementsByClassName('er8xn');
				const result = document.getElementsByClassName('VIiyi');
				
				return {
					text: text[0].value,
					result: result[0].children[0].innerText,
				};
			});

			translater.fromLanguage = Languages.filter(data => data.shortName == params.from)[0];
			translater.toLanguage = Languages.filter(data => data.shortName == params.to)[0];

			await browser.close();

			return translater;
		} catch (error) {
			return Promise.reject(error);
		}
	},
}