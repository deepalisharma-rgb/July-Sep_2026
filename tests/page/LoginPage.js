import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameField = page.getByPlaceholder('Email or Username');
    this.passwordField = page.getByPlaceholder('Password');
    this.submitButton = page.locator("button[type='submit']");
  }

  async login(baseUrl, username, password) {
    await this.page.goto(baseUrl);
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
    await expect(this.usernameField).not.toBeVisible();
  }
}
