// utils/SoftAssertions.js
class SoftAssertions {
  constructor() {
    this.errors = [];
  }

  // Runs an assertion; on failure, stores your message + Playwright's error
  async check(assertionFn, message) {
    try {
      await assertionFn();
    } catch (e) {
      this.errors.push(`${message}\n${e.message}`);
    }
  }

  // Same idea as Java's assertAll()
  assertAll() {
    if (this.errors.length > 0) {
      throw new Error(this.errors.join('\n\n'));
    }
  }
}
