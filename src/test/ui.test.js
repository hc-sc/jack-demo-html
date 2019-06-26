describe('UI Tests', () => {
  beforeAll(async () => {
    await page.goto('https://wet-boew.github.io/themes-dist/GCWeb/index-en.html')
  })

  test('should display "Canada.ca theme" text on page', async () => {
    await expect(page).toMatch('Canada.ca theme')
  });
  test("should assert that a div named landscape exists", async () => {
    const landscape = await page.$eval(".landscape", el => (el ? true : false));
    expect(landscape).toBe(true);
  });
  test("french link should lead to french site", async () => {
    await page.click('a[lang=fr]');
    const site = await page.url();
expect(site).toBe('https://wet-boew.github.io/themes-dist/GCWeb/index-fr.html');
  });
     
})
