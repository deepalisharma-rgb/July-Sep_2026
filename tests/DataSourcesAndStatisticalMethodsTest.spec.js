import { test, expect } from '@playwright/test';
import { AnalysisPage } from './page/AnalysisPage.js';
import { DataSourcesAndStatisticalMethodsPage } from './page/DataSourcesAndStatisticalMethodsPage.js';
import { LoginPage } from './page/LoginPage.js';
import { assertTestConfig, testConfig } from './config/testConfig.js';
import dataSourceData from '../tests/json/dataSource.json';
import analysisData from '../tests/json/analysis.json';

test.describe('Data Sources and Statistical Methods Module', () => {
test.describe.configure({ mode: 'parallel' });
  let analysisPage;
  let dataSourcePage;
  let analysisName;
  let dataSourceValues;

  test.beforeEach(async function ({ page }, testInfo) {
    page.setDefaultTimeout(120000);
    analysisPage = new AnalysisPage(page);
    dataSourcePage = new DataSourcesAndStatisticalMethodsPage(page);
    const loginPage = new LoginPage(page);
    const uniqueSuffix = `-${testInfo.project.name[0]}${testInfo.workerIndex}${Date.now().toString().slice(-6)}`;

    dataSourceValues = {
      dataSource: `Clinical${uniqueSuffix}`,
      assessment: dataSourceData.assessment,
      rationaleAndLimitations: dataSourceData.rationaleAndLimitations,
      editedDataSource: `Updated${uniqueSuffix}`,
      editedAssessment: dataSourceData.editedAssessment,
      editedRationaleAndLimitations: dataSourceData.editedRationaleAndLimitations,
    };

    assertTestConfig();
    await loginPage.login(testConfig.baseUrl, testConfig.username, testConfig.password);

    // create an analysis to work inside, then open it
    const analysisSuffix = `${testInfo.project.name[0]}${testInfo.workerIndex}${Date.now().toString().slice(-6)}`;
    analysisName = `Analysis${analysisSuffix}`;
    await analysisPage.addNewAnalysis(
      analysisName,
      analysisData.longAnalysisDescription
    );
    await analysisPage.clickOnAnalysis(analysisName);
  });

  test('Verify user is able to add, edit and delete a data source', async () => {

    await dataSourcePage.clickOnSideBar();

    // ADD
    await dataSourcePage.addDataSource(
      dataSourceValues.dataSource,
      dataSourceValues.assessment,
      dataSourceValues.rationaleAndLimitations
    );

    const actual = (await dataSourcePage.getRowData(dataSourceValues.dataSource))
      .map(v => v.trim().toLowerCase());
    const expected = [
      dataSourceValues.dataSource,
      dataSourceValues.assessment,
      dataSourceValues.rationaleAndLimitations
    ].map(v => v.toLowerCase());

    expect(actual).toEqual(expect.arrayContaining(expected));

    // EDIT
    await dataSourcePage.editDataSource(
      dataSourceValues.dataSource,
      dataSourceValues.editedDataSource,
      dataSourceValues.editedAssessment,
      dataSourceValues.editedRationaleAndLimitations
    );

    await dataSourcePage.verifyDataSourcePresent(dataSourceValues.editedDataSource);

    // DELETE
    await dataSourcePage.deleteDataSource(dataSourceValues.editedDataSource);
    await dataSourcePage.verifyDataSourceDeleted(dataSourceValues.editedDataSource);
  });
});