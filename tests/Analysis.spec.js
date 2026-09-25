import { test, expect } from '@playwright/test';
import { AnalysisPage } from './page/AnalysisPage.js';
import { LoginPage } from './page/LoginPage.js';
import { assertTestConfig, testConfig } from './config/testConfig.js';
import analysisData from '../tests/json/analysis.json';

test.describe('Analysis Module', () => {

  let analysisPage;
  
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(120000);
    analysisPage = new AnalysisPage(page); 
    const loginPage = new LoginPage(page);

    assertTestConfig();
    await loginPage.login(testConfig.baseUrl, testConfig.username, testConfig.password);
  });

 test('Verify user able to add, edit and delete analysis', async () => {
  test.describe.configure({ mode: 'serial' });
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

test('Verify analysis headers and elements', async () => {
  await analysisPage.verifyAnalysisHeaderText();
  await analysisPage.verifySPEACLogo();   
  await analysisPage.verifyIntroductionButton();
});

});