describe('General Tests', () => {
  beforeAll(async () => {
    await page.goto('file://localhost/home/bbhowmik/jack-demo-html/dist/index-en.html')
  });

  test('should display "Date Modified" text on page', async () => {
    await expect(page).toMatch('Date modified: 2019-06-04')
  });
  test("should assert that a div named landscape exists", async () => {
    const landscape = await page.$eval(".landscape", el => (el ? true : false));
    expect(landscape).toBe(true);
  });
      
})

describe('Calculator Tests', () => {
 test("clicking button 9 should display 9", async () => {
    await page.click('button[id="nine"]');
         const element = await page.$(".window");
         const text = await (await element.getProperty('textContent')).jsonValue();
         expect(text).toBe('9');
  });
  test("clicking button + should display 9+", async () => {
    await page.click('button[id="add"]');
         const element = await page.$(".window");
         const text = await (await element.getProperty('textContent')).jsonValue();
         expect(text).toBe('9+');
  });
 test("inputting 9+5= should display 14", async () => {
	await page.click('button[id="five"]');
	await page.click('button[id="ans"]');
         const element = await page.$(".window");
         const text = await (await element.getProperty('textContent')).jsonValue();
         expect(text).toBe('14');
  });
test("clicking AC should display 0", async () => {
        await page.click('button[id="AC"]');
         const element = await page.$(".window");
         const text = await (await element.getProperty('textContent')).jsonValue();
         expect(text).toBe('0');
  });
 test("inputting 3*125= should display 375", async () => {
        await page.click('button[id="three"]');
        await page.click('button[id="multiply"]');
 	await page.click('button[id="one"]');
	await page.click('button[id="two"]');
	await page.click('button[id="five"]');
 	await page.click('button[id="ans"]');
         const element = await page.$(".window");
         const text = await (await element.getProperty('textContent')).jsonValue();
         expect(text).toBe('375');
  });


})
