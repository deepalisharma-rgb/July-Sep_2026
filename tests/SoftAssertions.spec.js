const {test, expect} = require('@playwright/test');

test('Hard Assertions in Playwright', async ({page})=> 
{
    await page.goto("https://www.demoblaze.com/index.html");
    //hard assertions
     await expect(page).toHaveTitle("STORE123"); //assertion to check if the title of the webpage is correct
    await expect(page).toHaveURL("https://www.demoblaze.com/index.html"); //assertion to check if the URL of the webpage is correct
    await expect(page.locator("id=nava")).toBeVisible(); //assertion to check if the logo of the webpage is visible
})

test('Soft Assertions in Playwright', async ({page})=> 
{
    await page.goto("https://www.demoblaze.com/index.html");
    //soft assertion
    await expect.soft(page).toHaveTitle("STORE123"); //assertion to check if the title of the webpage is correct
    await expect.soft(page).toHaveURL("https://www.demoblaze.com/index.html"); //assertion to check if the URL of the webpage is correct
    await expect.soft(page.locator("id=nava")).toBeVisible(); //assertion to check if the logo of the webpage is visible
})