import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { time } from 'node:console';

export class AnalysisPage extends BasePage {

  constructor(page) {
    super(page);

    this.addNewAnalysisBtn = "//button[text()=' Add New Analysis ']";
    this.analysisNameField = "//input[@type='text']";
    this.analysisDescriptionField = "//textarea";
    this.saveButton = "//button[text()='Save']";

    this.toastMessage = "mat-snack-bar-container .mat-mdc-snack-bar-label";

    this.analysisTableRows = "tbody tr";

    this.deleteButton = "//button[text()='DELETE']";

    this.analysisHeader = "//h3[text()='Benefit-Risk Module']";
  }

  async navigate(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
    console.log('Current URL:', this.page.url());
  }

  static randomNumber() {
        return Math.floor(Math.random() * 1000000);
    }

  async addNewAnalysis(name, description) {

    await this.click(this.addNewAnalysisBtn);

    await this.fill(this.analysisNameField, name);

    await this.fill(this.analysisDescriptionField, description);

    await this.click(this.saveButton);
  }

  // async verifyToastMessage(expectedText) {
  //   await expect(this.page.locator(this.toastMessage))
  //     .toHaveText(expectedText);
  // }

  async verifyAnalysisPresent(name) {
    const row = this.page.locator(this.analysisTableRows)
      .filter({ hasText: name });
    await expect(row).toBeVisible();
  }

  async verifyToastMessage(expectedMessage) {
  const actualToast = this.page.locator(this.toastMessage).filter({ hasText: expectedMessage }).last();
  await expect(actualToast).toBeVisible();
  await expect(actualToast).toHaveText(expectedMessage);
}

  async deleteAnalysis(name) {

    const row = this.page.locator(this.analysisTableRows)
      .filter({ hasText: name });

    await row.locator("i.fa-solid.fa-trash").click();

    await this.click(this.deleteButton);
  }

  async verifyAnalysisDeleted(name) {

    const row = this.page.locator(this.analysisTableRows)
      .filter({ hasText: name });

    await expect(row).toHaveCount(0);
  }

  async editAnalysis(oldName, newName) {

    const row = this.page.locator(this.analysisTableRows)
      .filter({ hasText: oldName });

    // await row.locator(".fa-solid fa-edit").first().click();
    await row.locator("i.fa-solid.fa-edit").click();

    await this.fill(this.analysisNameField, newName);

    await this.click(this.saveButton);
  }

  async verifyHeader() {
    await expect(this.page.locator(this.analysisHeader))
      .toHaveText("Benefit-Risk Module");
  }
}