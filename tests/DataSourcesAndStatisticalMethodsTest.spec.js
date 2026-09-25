import { test, expect } from '@playwright/test';
import { AnalysisPage } from './page/AnalysisPage.js';
import { DataSourcesAndStatisticalMethodsPage } from './page/DataSourcesAndStatisticalMethodsPage.js';
import { LoginPage } from './page/LoginPage.js';
import { assertTestConfig, testConfig } from './config/testConfig.js';
import dataSourceData from '../tests/json/dataSource.json';
import analysisData from '../tests/json/analysis.json';

test.describe('Data Sources and Statistical Methods Module', () => {
test.describe.configure({ mode: 'serial' });
  let analysisPage;
  let dataSourcePage;
  let analysisName;

  test.beforeEach(async function ({ page }) {
    page.setDefaultTimeout(120000);
    analysisPage = new AnalysisPage(page);
    dataSourcePage = new DataSourcesAndStatisticalMethodsPage(page);
    const loginPage = new LoginPage(page);

    assertTestConfig();
    await loginPage.login(testConfig.baseUrl, testConfig.username, testConfig.password);

    // create an analysis to work inside, then open it
    const random = await AnalysisPage.randomNumber();
    analysisName = `Analysis${random}`;
    await analysisPage.addNewAnalysis(analysisName, analysisData.longAnalysisDescription);
    await analysisPage.clickOnAnalysis(analysisName);
  });

  test('Verify user is able to add, edit and delete a data source', async () => {

    await dataSourcePage.clickOnSideBar();

    // ADD
    await dataSourcePage.addDataSource(
      dataSourceData.dataSource,
      dataSourceData.assessment,
      dataSourceData.rationaleAndLimitations
    );

    const actual = (await dataSourcePage.getRowData(dataSourceData.dataSource))
      .map(v => v.trim().toLowerCase());
    const expected = [
      dataSourceData.dataSource,
      dataSourceData.assessment,
      dataSourceData.rationaleAndLimitations
    ].map(v => v.toLowerCase());

    expect(actual).toEqual(expect.arrayContaining(expected));

    // EDIT
    await dataSourcePage.editDataSource(
      dataSourceData.editedDataSource,
      dataSourceData.editedAssessment,
      dataSourceData.editedRationaleAndLimitations
    );

    await dataSourcePage.verifyDataSourcePresent(dataSourceData.editedDataSource);

    // DELETE
    await dataSourcePage.deleteDataSource();
    await dataSourcePage.verifyDataSourceDeleted(dataSourceData.editedDataSource);
  });
});