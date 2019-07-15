module.exports = {
	'projects': [{
			'displayName': 'unit test',
			'testEnvironment': 'jsdom',
			'testRegex': [
				'/src/test/unit-errorHandling.test.js',
				'/src/test/unit-calculation.test.js',
				'/src/test/unit-displayingResult.test.js',
				'/src/test/unit-clearing.test.js'
			]
		},
		{
			"displayName": "ui test",
			"preset": "jest-puppeteer",
			"testRegex": ["/src/test/ui.test.js"]
		}
	]

};