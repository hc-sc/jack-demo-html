describe('check title', () => {
  beforeAll(async () => {
    await page.goto('https://wet-boew.github.io/themes-dist/GCWeb/index-en.html')
  })

  it('should display "Index of /" text on page', async () => {
    await expect(page).toMatch('Canada.ca theme')
  })
  test("should assert that a div named landscape exists", async () => {
    const landscape = await page.$eval(".landscape", el => (el ? true : false));
    expect(landscape).toBe(true);
  });
 
})
