export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async click(locator) {
    await this.page.locator(locator).click();
  }

  async fill(locator, text) {
    await this.page.locator(locator).fill(text);
  }

  async getText(locator) {
    return await this.page.locator(locator).textContent();
  }

  async isVisible(locator) {
    return await this.page.locator(locator).isVisible();
  }

  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }

  randomNumber() {
    return Math.floor(Math.random() * 100000);
  }
}