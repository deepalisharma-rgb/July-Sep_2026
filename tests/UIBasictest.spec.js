// import {test, expect} from '@playwright/test'; 
// test is used to create a test case
// expect is used for assertion
const {test, expect} = require('@playwright/test');

// browser is a fixture, fixture is a global variable
// page is a fixture, it is an instance of the browser, 
// it is used to interact with the web page

// javascript is async programming language, all steps execute parallel,
// to execute steps in sequence we use async-function return promise
// and await keywords - wait for the promise to resolve before moving to the next step

test('Verify Title', async ({page})=>
{
    await page.goto("https://devstringx.clovehr.com/");
    console.log(await page.title()); //console.log is used to print the title of the page in the console
    await expect(page).toHaveTitle("HRMS"); //expect is used to make assertion/ validation, toHaveTitle is used to check the title of the page
    await expect(page).toHaveURL("https://devstringx.clovehr.com/"); //toHaveURL is used to check the URL of the page
    await page.close(); //close the browser after the test is completed
});