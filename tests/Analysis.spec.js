import { test, expect } from '@playwright/test';
import { AnalysisPage } from './page/AnalysisPage.js';
import { LoginPage } from './page/LoginPage.js';
import { assertTestConfig, testConfig } from './config/testConfig.js';
import analysisData from '../tests/json/analysis.json';

test.describe('Analysis Module', () => {
  test.describe.configure({ mode: 'parallel' });

  let analysisPage;
  
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(120000);
    analysisPage = new AnalysisPage(page); 
    const loginPage = new LoginPage(page);

    assertTestConfig();
    await loginPage.login(testConfig.baseUrl, testConfig.username, testConfig.password);
  });

 test('Verify user able to add, edit and delete analysis', async ({}, testInfo) => {
   const uniqueSuffix = `${testInfo.project.name[0]}${testInfo.workerIndex}${Date.now().toString().slice(-6)}`;
   const analysisName = `Analysis${uniqueSuffix}`;
   const updatedName = `Updated${uniqueSuffix}`;

    // ADD
    await analysisPage.addNewAnalysis(
      analysisName,
      analysisData.longAnalysisDescription
    );

    // await analysisPage.verifyAnalysisPresent(analysisName);

    // EDIT
    await analysisPage.editAnalysis(
      analysisName,
      updatedName
    );

    await analysisPage.verifyAnalysisPresent(updatedName);

    // DELETE
    await analysisPage.deleteAnalysis(
      updatedName
    );

    await analysisPage.verifyAnalysisDeleted(updatedName);
  });

test('Verify analysis headers and elements', async () => {
  await analysisPage.verifyAnalysisHeaderText();
  await analysisPage.verifySPEACLogo();   
  await analysisPage.verifyIntroductionButton();
});

});