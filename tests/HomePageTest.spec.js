const { test, expect } = require('@playwright/test') 
/* 
require is used to import the module, 
in this case, we are importing the 'test' and 'expect' functions from the 
'@playwright/test' module. 
This allows us to use these functions in our test code to create and run tests,
 as well as to make assertions about the behavior of our application. */    

test('Verify Home Page Title', async ({ page }) => {
    await page.goto("https://devstringx.clovehr.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("HRMS");
    
    console.log(await page.url());
    await expect(page).toHaveURL("https://devstringx.clovehr.com/");
});
