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
})