import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { time } from 'node:console';

export class DataSourcesAndStatisticalMethodsPage extends BasePage {

  constructor(page) {
    super(page);
    this.page = page;

    // Sidebar
    this.dataSourcesLink = "//span[contains(normalize-space(.), 'Data Sources and Statistical Methods')]";

    // Buttons
    this.addDataSourceBtn = "//button[text()=' Add Data Source ']";
    this.editDataSourceBtn = "//button[text()=' Add Data Source ']/..//..//i[@class='fa-solid fa-edit']";
    this.deleteDataSourceBtn = "//button[contains(text(),'Add Data Source')]/..//..//i[@class='fa-solid fa-trash']";
    this.confirmDeleteBtn = "//button[@class='btn btn-primary px-4']"; // adjust to actual confirm-delete button text
    this.closeBtn = "//i[@class='fa-solid fa-xmark pointer']";

    // Form fields
    this.dataSourceTextField = "//div[@class='popup-body d-flex flex-column']//input[contains(@class,'form-control')]";
    this.assessmentTextArea = "(//div[@class='popup']//textarea[contains(@class,'form-control')])[1]";
    this.rationaleAndLimitationsTextArea = "(//div[@class='popup']//textarea[contains(@class,'form-control')])[2]";

    // Table
    this.dataSourceTableEmptyTxt = "//button[contains(text(),'Add Data Source')]/..//..//div/h2";
    this.tableRow = (name) => `//td[normalize-space(.)='${name}']/ancestor::tr`;

    // Toast
    this.toastMessage = ".toast-message, .toast-body"; // adjust to actual toast selector
  }

  async clickOnSideBar() {
    await this.page.locator(this.dataSourcesLink).click();
  }

  async addDataSource(dataSource, assessment, rationaleAndLimitations) {
    await this.page.locator(this.addDataSourceBtn).click();
    await this.page.locator(this.dataSourceTextField).fill(dataSource);
    await this.page.locator(this.assessmentTextArea).fill(assessment);
    await this.page.locator(this.rationaleAndLimitationsTextArea).fill(rationaleAndLimitations);
    await this.clickOnSaveBtn();
  }

  async editDataSource(dataSource, assessment, rationaleAndLimitations) {
    await this.page.locator(this.editDataSourceBtn).click();
    await this.page.locator(this.dataSourceTextField).fill(dataSource);
    await this.page.locator(this.assessmentTextArea).fill(assessment);
    await this.page.locator(this.rationaleAndLimitationsTextArea).fill(rationaleAndLimitations);
    await this.clickOnSaveBtn();
  }

  async deleteDataSource() {
    await this.page.locator(this.deleteDataSourceBtn).click();
    await this.page.locator(this.confirmDeleteBtn).click();
  }

  async clickOnSaveBtn() {
    const saveButton = this.page.getByRole('button', { name: 'Save', exact: true });
    await expect(saveButton).toBeVisible();
    await saveButton.click();
  }

  async getRowData(dataSourceName) {
    const row = this.page.locator(this.tableRow(dataSourceName));
    await expect(row).toBeVisible();
    return row.locator('td').allTextContents();
  }

  async verifyDataSourcePresent(dataSourceName) {
    await expect(this.page.locator(this.tableRow(dataSourceName))).toBeVisible();
  }

  async verifyDataSourceDeleted(dataSourceName) {
    await expect(this.page.locator(this.tableRow(dataSourceName))).toHaveCount(0);
  }

  async verifyToastMessage(expectedMessage) {
    await expect(this.page.locator(this.toastMessage)).toHaveText(expectedMessage);
  }

}