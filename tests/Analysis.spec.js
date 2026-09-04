import { test, expect } from '@playwright/test';
import { AnalysisPage } from './page/AnalysisPage.js';

import analysisData from '../tests/json/analysis.json';

test.describe('Analysis Module', () => {

  let analysisPage;

  test.beforeEach(async ({ browser }) => {
    const page = await browser.newPage();
    page.setDefaultTimeout(120000);
    analysisPage = new AnalysisPage(page); 

    await analysisPage.navigate('https://br-module-test.speacsafety.net/');

    // login step
    await page.getByPlaceholder('Email or Username').fill('deepali.sharma+admin@s2infinitum.com');
   // await page.fill('#email', 'deepali.sharma+automation@s2infinitum.com');
    await page.getByPlaceholder('Password').fill('Testing10!');
    await page.click("button[type='submit']");
  });

 test('Verify user able to add, edit and delete analysis', async () => {

    const random = await AnalysisPage.randomNumber();

    const analysisName = `Analysis${random}`;

    const updatedName = `UpdatedAnalysis${random}`;

    // ADD
    await analysisPage.addNewAnalysis(
      analysisName,
      analysisData.longAnalysisDescription
    );

    await analysisPage.verifyToastMessage(
      analysisData.addAnalysisMessageText
    );

    // await analysisPage.verifyAnalysisPresent(analysisName);

    // EDIT
    await analysisPage.editAnalysis(
      analysisName,
      updatedName
    );

    await analysisPage.verifyToastMessage(
      analysisData.updateAnalysisMessageText
    );

    await analysisPage.verifyAnalysisPresent(updatedName);

    // DELETE
    await analysisPage.deleteAnalysis(updatedName);

    await analysisPage.verifyToastMessage(
      analysisData.deleteAnalysisMessageText
    );

    await analysisPage.verifyAnalysisDeleted(updatedName);
  });

});