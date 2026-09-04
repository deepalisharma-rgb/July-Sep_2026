/*
import {test, expect} from '@playwright/test';
import { clear } from 'node:console';

test('Verify Locators', async ({page})=>
{
    await page.goto("https://www.demoblaze.com/index.html"); 
    //click on login and enter username and password and click on login button
    // await page.locator().click('id="login2"'); //id locator
    await page.click("id=login2") //id locator
    // await page.locator("#loginusername").fill("Deepali") //css locator
    await page.fill("#loginusername", "DeepaliS") //css locator
    await page.fill("#loginpassword", "Deepali@123") //css locator
    await page.click("button:has-text('Log in')") //text locator  
    //logout from application 
    const logoutlink =await page.locator("id=logout2") //id locator
    await expect(logoutlink).toBeVisible(); //assertion to check if logout link is visible after login
    // await page.close(); //close the browser after the test is completed
});

//locate multiple elements and perform action on them
test('Multiple Web Elements', async ({page})=>
{
  await page.goto("https://www.demoblaze.com/index.html");
  const links = await page.$$('a'); //$$ is used to locate multiple elements, in this case we are locating all the links on the webpage
  for(const link of links)
  {
    console.log(await link.textContent()); //textContent is used to get the text of the link
}
await expect(links.length).toBe(15); //check if the number of links on the webpage is 15

await page.waitForSelector("//div[@id='tbodyid']//h4//a"); //waitForSelector is used to wait for the element to be visible on the webpage, in this case we are waiting for the product links to be visible on the webpage
const products = await page.$$("//div[@id='tbodyid']//div//h4//a")
for(const product of products)
{
    const productName = await product.textContent(); //textContent is used to get the text of the link
    console.log("Product Name is : ", productName);
}
})
*/