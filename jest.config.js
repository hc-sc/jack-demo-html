module.exports = {
"projects": [
    {
      "displayName": "unit test",
	"testEnvironment": "jsdom",
	"testRegex":["/src/test/unitTest"]
    },
    {
      "displayName": "ui test",
      "preset": "jest-puppeteer",
      "testRegex": ["/src/test/uiTest/"]

    }
]   

 
};

