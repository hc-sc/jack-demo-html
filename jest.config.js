module.exports = {
"projects": [
    {
      "displayName": "unit test",
      "testEnvironment": "jsdom",
      "testRegex":["/src/test/unit.test.js"]
    },
    {	
      "displayName": "ui test",
      "preset": "jest-puppeteer",
      "testRegex": ["/src/test/ui.test.js"]
    }
]   

 
};
