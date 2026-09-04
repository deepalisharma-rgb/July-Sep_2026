/*
const{test,expect}=require('@playwright/test');

test('Assertions in Playwright', async ({page})=>       
{
    await page.goto("https://www.demoblaze.com/index.html");
    //assertion to check if the title of the webpage is correct
    await expect(page).toHaveURL("https://www.demoblaze.com/index.html"); //assertion to check if the URL of the webpage is correct 
    await expect(page).toHaveTitle("STORE"); //assertion to check if the title of the webpage is correct
    //assertion to check if the logo of the webpage is visible
    const logo = await page.locator("id=nava"); //locator to locate the logo of the webpage
    await expect(logo).toBeVisible(); //assertion to check if the logo of the webpage is visible    
})

test('Assertions in Playwright1', async ({page})=>       
{
    await page.goto("https://demo.nopcommerce.com/register");
    //assertion to check if the title of the webpage is correct
    await expect(page).toHaveURL("https://demo.nopcommerce.com/register"); //assertion to check if the URL of the webpage is correct 
    await expect(page).toHaveTitle("nopCommerce demo store. Register"); //assertion to check if the title of the webpage is correct
    //assertion to check if the logo of the webpage is visible
    const logo = await page.locator("css=.header-logo"); //locator to locate the logo of the webpage
    await expect(logo).toBeVisible(); //assertion to check if the logo of the webpage is visible  
    
    //radio button assertion
    const maleRadioButton = await page.locator('#gender-male');
    await expect(maleRadioButton).toBeVisible();    //select the radio button
    await maleRadioButton.check(); //check the radio button
    await expect(maleRadioButton).toBeChecked(); //assertion to check if the radio button is checked

    //checkbox assertion
    const newsletterCheckbox = await page.locator('#Newsletter');
    await expect(newsletterCheckbox).toBeVisible(); //assertion to check if the checkbox is visible
    await newsletterCheckbox.check(); //check the checkbox
    await expect(newsletterCheckbox).toBeChecked(); //assertion to check if the checkbox is checked     
})
    */