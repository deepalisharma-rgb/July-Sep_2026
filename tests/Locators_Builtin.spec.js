const {test, expect} = require('@playwright/test'); 

test('Built-in Locators', async ({page})=>
{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    const logo = await page.getByAltText('company-branding')
    await expect(logo).toBeVisible();

    await page.getByPlaceholder('Username').fill("Admin");
    await page.getByPlaceholder('Password').fill("admin123");
    await page.getByRole('button', {type: 'submit'}).click();
    const dashboard = await page.getByRole('heading', {name: 'Dashboard'})
    await expect(dashboard).toBeVisible();   
})