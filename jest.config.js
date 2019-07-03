module.exports = {
'projects': [
    {
      'displayName': 'unit test',
      'testEnvironment': 'jsdom',
      'testRegex':[
          '/src/test/unit-1.test.js',
          '/src/test/unit-2.test.js',
          '/src/test/unit-3.test.js',
          '/src/test/unit-4.test.js'
	]  
},
    {	
      "displayName": "ui test",
      "preset": "jest-puppeteer",
      "testRegex": ["/src/test/ui.test.js"]
    }      
        ]
    
    
};
     
  
